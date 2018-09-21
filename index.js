'use strict';

require(`${__dirname}/env.project.js`);
const ENV_CONF = process['crookse/portfolio'];

//
// @TODO:
// [ ] Static builds are based on modified files
//

var CrookseNode = require('crookse-node');
var Pug = require('pug');
var fs = require('fs');
var http = require('http');

CrookseNode.Dictionary.ResourceClassFiles = {};

////////////////////////////////////////////////////////////////////////////////////////////////////
// FILE MARKER: SERVER SETUP ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// Set up the server and run it
var server = CrookseNode.createServer(ENV_CONF.server_conf);
server.run();

// Add resources (override the server's default addHttpResources method)
server.addHttpResources = function(resources) {
  var files = fs.readdirSync(resources);
  files.forEach(function closure_addHttpResource_files(file) {
    // No dot files
    if (file.charAt(0) === '.') {
      return;
    }
    var resourceClassInfo = require(resources + '/' + file);
    CrookseNode.Dictionary.ResourceClassFiles[resourceClassInfo.class.name] = file;
    server.addHttpResource(resourceClassInfo);
  });
};
server.addHttpResources(ENV_CONF.resources_dir);

// Serve static dirs
var serveStatic = require('serve-static');
server.router.use('/public', serveStatic(__dirname + '/public'));
server.router.use('/favicon.ico', serveStatic(__dirname + '/favicon.ico'));

////////////////////////////////////////////////////////////////////////////////////////////////////
// FILE MARKER: ADD APPLICATIONS ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//
// DateUtils
//
CrookseNode.addApplication('DateUtils', {
  getDateTimeISO: function getDateTimeISO(offset) {
    var dateTime = new Date();
    var hours    = dateTime.getUTCHours() + (offset);
    dateTime.setUTCHours(hours);
    return dateTime.toISOString()
  },
  getDateLastUpdated: function getDateLastUpdated() {
    return this.getDateTimeISO(-4);
  }
});

//
// HttpUtils
//
CrookseNode.addApplication('HttpUtils', {
  renderHtml: function renderHtml(resource, request) {
    var htmlFile = CrookseNode.Dictionary.ResourceClassFiles[resource.constructor.name].replace('.js', '.pug');
    return Pug.renderFile(
      `${ENV_CONF.base_dir}/src/templates/resource.${htmlFile}`,
      getTemplateData(resource),
      function closure_renderHtml(error, result) {
        if (error) {
          throw new CrookseNode.Exception.HttpException_400(`Pug error: ${error.message}`);
        }
        result = result.replace(/\{\{\{ /g, '<code>');
        result = result.replace(/ \}\}\}/g, '</code>');
        return result;
      }
    );
  }
});

//
// IO
//
CrookseNode.addApplication('IO', {
  /**
   * Read a file
   *
   * @param {String} file
   *     The file to read.
   *
   * return {String}
   */
  readFile: function(file) {
    var contents = 'null'; // This is a string so that in the view it's actually displayed
    try {
      contents = fs.readFileSync(file, 'utf8', (error, contents) => {
        if (error) {
          contents = error.message;
        }
        return contents;
      });
    } catch (error) {
      server.logger.trace(error.message);
      contents = 'Error';
    }
    return contents;
  }
});

//
// PortfolioUtils
//
CrookseNode.addApplication('PortfolioUtils', require(`${__dirname}/src/utils.portfolio-utils.js`));

////////////////////////////////////////////////////////////////////////////////////////////////////
// FILE MARKER: OVERRIDE CROOKSE CODE //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// Override {server}.handleHttpRequest()
server.handleHttpRequest = (request, response) => {
  request.on('end', () => {
    server.logger.info(`Sending response. ${response.statusCode} (${response.statusMessage}).`);
  });

  var resource = request.getResource();

  response.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  // Handle 404 erors
  if (!resource) {
    throw new CrookseNode.Exception.HttpException_404('Resource not found.');
  }

  // Handle 405 errors
  if (!resource[request.TYPE_NAME]) {
    throw new CrookseNode.Exception.HttpException_405(`${resource.constructor.name}.${request.TYPE_NAME}() method is not defined; therefore, the method is not allowed.`);
  }

  // Make the request and response objects accessible in the resource object
  resource.response = response;
  resource.request = request;

  // Add new data members to the resource object
  resource.sendHtml = () => {
    return response.end(CrookseNode.Applications.HttpUtils.renderHtml(resource, request));
  }

  return resource[request.TYPE_NAME]();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// FILE MARKER: AUTO BUILD /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// Build the static versions of resources defined in the build configs
if (ENV_CONF.build_conf.files.length > 0) {
  var resources = [];
  var files = fs.readdirSync(`${ENV_CONF.base_dir}/src/resources`);
  files.forEach(function closure_build_static_files(file) {
    if (ENV_CONF.build_conf.files.indexOf(file) >= 0) {
      resources.push(require(`${ENV_CONF.base_dir}/src/resources/${file}`));
    }
  });
  const fullyQualifiedOutputDir = `${ENV_CONF.build_conf.output_dir}`;
  resources.forEach(function closure_build_static_resources(resourceInfo) {
    var resource = new resourceInfo.class();
    var htmlFile = CrookseNode.Dictionary.ResourceClassFiles[resource.constructor.name].replace('.js', '.pug');
    var html = Pug.renderFile(
      `${ENV_CONF.base_dir}/src/templates/resource.${htmlFile}`,
      getTemplateData(resource, true),
      function closure_renderHtml(error, result) {
        if (error) {
          throw new Error(`Pug error: ${error.message}`);
        }
        result = result.replace(/\{\{\{ /g, '<code>');
        result = result.replace(/ \}\}\}/g, '</code>');
        return result;
      });
    try {
      // TODO: Make the directory if it doesn't exist
      resourceInfo.static_build.build_as.forEach(function(outputFile) {
        const fullyQualifiedOutputFile = `${fullyQualifiedOutputDir}${outputFile}`;
        fs.writeFile(`${fullyQualifiedOutputFile}`, html, function(error) {
          if (error) {
            console.log(error);
            return;
          }
          console.log(`Rendered ${fullyQualifiedOutputFile}`);
        });
      });
    } catch (error) {
      console.log(`Error building ${resource.constructor.name} static version:\n  ${error.message}`);
    }
  });
  const { spawn } = require('child_process');
  var cp = spawn('cp', ['-R', `${ENV_CONF.base_dir}/public/`, `${fullyQualifiedOutputDir}/public/`]);
  cp.on('close', (code) => {
    console.log(`cp process for ${ENV_CONF.base_dir}/public to ${fullyQualifiedOutputDir}/public done. Exit code ${code}.`);
  });
  cp = spawn('cp', ['-R', `${ENV_CONF.base_dir}/favicon.ico`, `${fullyQualifiedOutputDir}/favicon.ico`]);
  cp.on('close', (code) => {
    console.log(`cp process for favicon done. Exit code ${code}.`);
  });
  // if (ENV_CONF.build_conf.exit_after_build) {
  //   process.exit();
  // }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// FILE MARKER: FUNCTIONS //////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Get the template data
 *
 * @param {mixed} resource
 *     The resource object
 * @param {Boolean} isStatic
 *     Do you want to get template data for a resource's static version (it's HTML page)?
 */
function getTemplateData(resource, isStatic = false) {
  var commonFrontEndVars = {
    app_conf: {
      base_url: ENV_CONF.app_conf.base_url,
      environment: (function iife() {
        var env = ENV_CONF.app_conf.environment.toLowerCase();
        if (env == 'production') {
          return false;
        }
        // TODO: Check isStatic and attach (static) to env text
        return 'ENV: ' + env.toUpperCase()
      }()),
      resume_link: `${ENV_CONF.app_conf.base_url}/public/files/${ENV_CONF.app_conf.resume_filename}`
    }
  };

  var frontEndVars = {};

  if (ENV_CONF.build_conf.bust_cache_for_assets) {
    frontEndVars.asset_version = new Date().getTime();
  }
  
  frontEndVars.html_document_title = `${ENV_CONF.app_conf.app_name}`;

  switch (ENV_CONF.app_conf.environment.toLowerCase()) {
    case 'development':
      if (resource.html_document_title) {
        frontEndVars.html_document_title += ` / ${resource.html_document_title}`;
      }
      break;
  }

  var allFrontEndVars = Object.assign(resource.front_end_vars, frontEndVars, commonFrontEndVars);
  // Define variables that could possibly throw the annoying Vue warning: "Property or method
  // "some_variable" is not defined on the instance but is referenced during render. Make sure that
  // this property is reactive, either in the data option, or for class-based components, by
  // initializing the property. Ugh..
  [
    'html_body_id',
    'body_classes',
    'page_scripts',
  ].forEach((variable) => {
    if (!allFrontEndVars.hasOwnProperty(variable)) {
      allFrontEndVars[variable] = null;
    }
  });

  // Add global scripts
  // TODO: Build using ENV_CONF
  allFrontEndVars.global_scripts = {
    vue: (isStatic && ENV_CONF.build_conf.production) ? "/public/assets/vendor/vue/vue.prod.min.js" : "/public/assets/vendor/vue/vue.dev.js"
  };

  var templateData = {
    front_end_vars: allFrontEndVars,
    front_end_vars_stringified: JSON.stringify(allFrontEndVars, null, 4),
    pretty: true
  };

  return templateData;
};

