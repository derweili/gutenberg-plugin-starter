/**
 * Get dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { PanelBody, PanelRow } = wp.components;
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

const PluginSidebarDemo = props => {
  return (
    <Fragment>
      <PluginSidebarMoreMenuItem target="jsforwpadvgb-demo">
        {__("Plugin Sidebar Demo", "gutenbergpluginstarter")}
      </PluginSidebarMoreMenuItem>
      <PluginSidebar
        name="jsforwpadvgb-demo"
        title={__("Plugin Sidebar Demo", "gutenbergpluginstarter")}
      >
        <PanelBody title={__("Sidebar Header", "gutenbergpluginstarter")} opened>
          <PanelRow>
            <p>{__("Plugin Sidebar Demo", "gutenbergpluginstarter")}</p>
          </PanelRow>
        </PanelBody>
      </PluginSidebar>
    </Fragment>
  );
};

registerPlugin("jsforwpadvgb-demo", {
  icon: "admin-plugins",
  render: PluginSidebarDemo
});
