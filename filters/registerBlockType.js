const { __ } = wp.i18n;
const { addFilter } = wp.hooks;

// addFilter(
//   "blocks.registerBlockType",
//   "jsforwp-advgb/extending-register-block-type",
//   extendWithRegisterBlockType
// );

// function extendWithRegisterBlockType(settings, name) {
//   // Check for block type
//   if ("core/code" === name) {
//     // Change the block title
//     settings.title = __("Code Snippet", "gutenbergpluginstarter");

//     // Change the block description
//     settings.description = __(
//       "Use for maximum codiness 💃",
//       "gutenbergpluginstarter"
//     );

//     // Change block category
//     settings.category = "recommended";

//     // Change block icon
//     settings.icon = "admin-tools";

//     // Change keywords
//     if (settings.keywords) {
//       settings.keywords.push(__("💻", "gutenbergpluginstarter"));
//     } else {
//       settings.keywords = [__("💻", "gutenbergpluginstarter")];
//     }

//     // Change supports
//     settings.supports = Object.assign({}, settings.supports, {
//       html: true,
//       anchor: true
//     });

//     // Edit attributes
//     settings.attributes.new = {
//       type: "string",
//       default: "Default text"
//     };

//     // settings.edit = props => <p>OVERRIDE</p>;
//     // settings.save = props => <p>NOPE</p>;
//   }
//   return settings;
// }
