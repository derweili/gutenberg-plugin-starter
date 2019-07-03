const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { createBlock } = wp.blocks;
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

import icons from "./icons";
import "./plugin.scss";
import SwitcherControls from "./components/SwitcherControls";

const LayoutSwitcher = () => {
  const layouts = {
    default: [createBlock("core/paragraph", {})],
    hero: [
      createBlock("core/cover", { align: "full" }),
      createBlock("core/button", {
        text: __("Layout Switcher", "gutenbergpluginstarter"),
        align: "center"
      }),
      createBlock("core/columns", { columns: 3 })
    ],
    featured: [
      createBlock("core/heading", {}),
      createBlock("core/spacer", { height: "10" }),
      createBlock("core/media-text", { align: "full" }),
      createBlock("core/spacer", { height: "40" }),
      createBlock("core/quote", {}),
      createBlock("core/spacer", { height: "20" }),
      createBlock("core/media-text", { mediaPosition: "right" }),
      createBlock("core/paragraph", {
        placeholder: __("Outro Text", "gutenbergpluginstarter")
      })
    ]
  };

  return (
    <Fragment>
      <PluginSidebarMoreMenuItem target="jsforwpadvgb-layout-switcher">
        {__("Layout Switcher", "gutenbergpluginstarter")}
      </PluginSidebarMoreMenuItem>
      <PluginSidebar
        name="jsforwpadvgb-layout-switcher"
        title={__("Layout Switcher", "gutenbergpluginstarter")}
      >
        <SwitcherControls icons={icons} layouts={layouts} />
      </PluginSidebar>
    </Fragment>
  );
};

registerPlugin("jsforwpadvgb-layout-switcher", {
  icon: icons.switcher,
  render: LayoutSwitcher
});
