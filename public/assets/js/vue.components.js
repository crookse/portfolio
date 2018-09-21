Vue.component('h2-heading', {
  props: {
    heading: String,
    subheading: String,
    backtotop: String
  },
  render: function(createElement) {
    return createElement(
      'div',
      { class: 'page-heading-container' },
      [
        createElement(
          'h2',
          { class: 'heading' },
          [
            this.heading,
            this.subheading
              ? createElement(
                'span',
                { class: 'subheading' },
                this.subheading
              )
              : null
          ]
        )
      ]
    );
  }
});

Vue.component('code-block', {
  props: {
    heading: String,
    file: String,
    prism: String,
    code: String
  },
  render: function(createElement) {
    var heading = false; // TODO: Use this maybe...
    if (this.file) {
      heading = `File: /path/to/your/project${this.file}`;
    } else if (this.heading) {
      heading = this.heading;
    } else if (this.code.hasOwnProperty('file')) {
      heading = this.code.file
    }
    return createElement(
      'div',
      { class: 'code-block-container' },
      [
        createElement(
          'pre',
          { class: 'header' },
          [
            createElement('code', null, heading)
          ]
        ),
        createElement(
          'pre',
          { class: 'body' },
          [
            createElement(
              'code',
              { class: this.prism },
              // TODO: Prism removes Vue's reactivity for this element. Fix it.
              this.code
              // vueAppOptions.data.example_code[this.code]
            )
          ]
        ),
      ]
    );
  }
});

Vue.component('data-type', {
  props: {
    type: String
  },
  render: function(createElement) {
    return createElement(
      'p',
      null,
      [
        createElement(
          'code',
          null,
          [
            `<${this.type}>`
          ]
        )
      ]
    );
  }
});

// code.c-code-parameter message 
// code.c-code-data-type String
// ul
//   li 
Vue.component('parameter-definition', {
  props: {
    name: String,
    type: String,
    description: String
  },
  render: function(createElement) {
    return createElement(
      'div',
      {class: 'parameter-definition'},
      [
        createElement('code', { class: 'c-code-parameter' }, this.name),
        createElement('code', null, `<${this.type}>`),
        this.description
          ? createElement('ul', null, [
              createElement('li', null, this.description)
            ])
          : null
      ]
    )
  }
})