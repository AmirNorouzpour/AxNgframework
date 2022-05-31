const less = require("less");
const LessPluginCleanCSS = require("less-plugin-clean-css");
const fs = require("fs");
const themeVars = require("./theme-vars");

const appStyles = "../node_modules/ng-zorro-antd/ng-zorro-antd.less";
const themeContent = `@import '${appStyles}';`;

themeVars.forEach((theme, index) => {
  less
    .render(themeContent, {
      javascriptEnabled: true,
      plugins: [new LessPluginCleanCSS({ advanced: true })],
      modifyVars: {
        ...theme,
      },
    })
    .then((data) => {
      fs.writeFileSync(
        // output path for the theme style
        `../src/assets/themes/style.theme${index + 1}.css`,
        data.css
      );
    })
    .catch((e) => {
      // log the render error
      console.error(e);
    });
});
