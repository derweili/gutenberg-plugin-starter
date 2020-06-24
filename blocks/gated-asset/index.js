import './style.scss';
import './editor.scss';

const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { BlockControls, MediaUpload, RichText } = wp.blockEditor
const { IconButton, Toolbar } = wp.components;

registerBlockType( 'antares/gatedasset', {
    title: 'Gated Asset',
    icon: 'screenoptions',
    category: 'widgets',
    example: {
        attributes: {
            label: "Infografik",
            title: "ANTARES LCS Engineering Dienstleistungen",
            file: {
                url: '#'
            }
        }
    },
    attributes: {
        label: {
            type: "string",
            default: ''
        },
        title: {
            type: "string",
            default: ''
        },
        file: {
            type: "object"
        }
    },

    edit(props) {
        const {setAttributes, attributes} = props;
        const {label, title, file} = attributes;

        console.log(file);

        return (
            <Fragment>
                <BlockControls>
                    <Toolbar>
                        <MediaUpload
                            value={file ? file.id : null}
                            onSelect={(file) => setAttributes({file})}
                            render={({ open }) => (
                                <IconButton
                                    className="components-toolbar__control"
                                    label={"Daten hinzufügen"}
                                    icon="media-document"
                                    onClick={open}
                                />
                            )}
                        />
                    </Toolbar>
                </BlockControls>
                <div className={`antares-gated-asset `}>
                    <RichText
                        tagName="span" // The tag here is the element output and editable in the admin
                        value={ label } // Any existing content, either from the database or an attribute default
                        formattingControls={ [] } // Allow the content to be made bold or italic, but do not allow other formatting options
                        onChange={ ( label ) => setAttributes({label}) } // Store updated content as a block attribute
                        placeholder={ 'Label...' } // Display this text before any content has been added by the user
                        keepPlaceholderOnFocus
                        className="gated-asset-label"
                    />
                    <RichText
                        tagName="h4" // The tag here is the element output and editable in the admin
                        value={ title } // Any existing content, either from the database or an attribute default
                        formattingControls={ [] } // Allow the content to be made bold or italic, but do not allow other formatting options
                        onChange={ ( title ) => setAttributes({title}) } // Store updated content as a block attribute
                        placeholder={ 'Titel...' } // Display this text before any content has been added by the user
                        keepPlaceholderOnFocus
                    />
                    <a class="download-link gated_asset_download" >Download PDF</a>
                </div>
            </Fragment>
        );
    },
    save(props) {
        const {label, title, file} = props.attributes;

      
        return (
            <div className={`antares-gated-asset `}>
                {
                    label && (
                        <RichText.Content
                            tagName="span" // The tag here is the element output and editable in the admin
                            value={ label } // Any existing content, either from the database or an attribute default
                            className="gated-asset-label"
                        />
                    )        
                }
                <RichText.Content
                    tagName="h4" // The tag here is the element output and editable in the admin
                    value={ title } // Any existing content, either from the database or an attribute default
                />
                <a class="download-link gated_asset_download" data-href={file ? file.url : ''} download>Download PDF</a>
            </div>
        )
    },
} );