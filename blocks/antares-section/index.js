import './style.scss';
import './editor.scss';

const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, BlockControls, MediaUpload } = wp.blockEditor
const { ColorPalette, PanelBody, PanelRow, IconButton, Button, Toolbar, FocalPointPicker, RangeControl } = wp.components;

const colors = [
    { name: 'black', color: '#000' },
    { name: 'blue', color: '#0058A7' },
    { name: 'light-blue', color: '#DBEFFB' },
    { name: 'gray', color: '#E8E8E8' },
];

const getClassNameByColor = (color) => {
    switch (color) {
        case "#000":
            return "black"
            break;
        case "#0058A7":
            return "blue"
            break;
        case "#E8E8E8":
            return "gray"
            break;
        case "#DBEFFB":
            return "light-blue"
            break;
    
        default:
            break;
    }
}
 
registerBlockType( 'antares/section', {
    title: 'Antares Section',
    icon: 'screenoptions',
    category: 'layout',
    example: {},
    attributes: {
        color: {
            type: "string",
            default: ''
        },
        backgroundImage: {
            type: "object",
            default: ''
        },
        image: {
            type: "object"
        },
        focalPoint: {
            type: "object"
        },
        dimRatio : {
            type: "number",
            default: 50
        }
    },
    supports: {
        align: ['full']
    },

    edit(props) {
        const {setAttributes, attributes} = props;
        const {color, image, focalPoint, dimRatio} = attributes;

        const selectImage = (image) => {
            setAttributes({image})
        }

        let backgroundImageStyle = {};

        if(focalPoint) {
            backgroundImageStyle.objectPosition = `${ focalPoint.x * 100 }% ${
                focalPoint.y * 100
            }%`;
        }

        return (
            <Fragment>
                <BlockControls>
                    <Toolbar>
                        <MediaUpload
                            allowedTypes={["image/jpg", "image/jpeg", "image/png"]}
                            value={image ? image.id : null}
                            onSelect={(image) => selectImage(image)}
                            render={({ open }) => (
                                <IconButton
                                    className="components-toolbar__control"
                                    label={"Hintergrundbild hinzufügen"}
                                    icon="format-image"
                                    onClick={open}
                                />
                            )}
                        />
                    </Toolbar>
                </BlockControls>
                <InspectorControls>
                    <PanelBody title="Hintergrund" initialOpen={true}>
                        <PanelRow>
                            <ColorPalette
                                colors={ colors }
                                value={ color }
                                onChange={ ( color ) => setAttributes( { color } ) }
                                clearable
                                disableCustomColors
                            />
                        </PanelRow>
                    </PanelBody>
                    {
                        image && (
                            <PanelBody title="Media" initialOpen={true}>
                                <FocalPointPicker
                                        label="Fokuspunkt"
                                        url={ image.url }
                                        value={ focalPoint }
                                        onChange={ ( newFocalPoint ) => {
                                                setAttributes( {
                                                    focalPoint: newFocalPoint,
                                                } )
                                            }
                                        }
                                    />
                                    <PanelRow>
                                        <Button
                                            isSecondary
                                            isSmall
                                            className="block-library-cover__reset-button"
                                            onClick={ () =>
                                                setAttributes( {
                                                    image: null
                                                } )
                                            }
                                        >
                                            Bild entfernen
                                        </Button>
                                    </PanelRow>
                            </PanelBody>
                        )
                    }
                    {
                        image && (
                            <PanelBody title="Overlay" initialOpen={true}>
                                <RangeControl
                                    label={ 'Background opacity' }
                                    value={ dimRatio }
                                    onChange={ ( newDimRation ) =>
                                        setAttributes( {
                                            dimRatio: newDimRation,
                                        } )
                                    }
                                    min={ 0 }
                                    max={ 100 }
                                    required
                                />
                            </PanelBody>
                        )
                    }
                </InspectorControls>
                <div className={`antares-section ${color ? 'color-' + getClassNameByColor(color) : ''}`}>
                    <div className="antares-section--inner">
                        <InnerBlocks />
                    </div>
                    {
                        image && (
                            <img src={image.url} alt={image.alt} className="background-image" style={ backgroundImageStyle }/>
                        )
                    }
                    {
                        image && <div className="backdrop" style={{opacity: dimRatio + '%'}}></div>
                    }
                </div>
            </Fragment>
        );
    },
    save(props) {
        const {color, image, focalPoint, dimRatio} = props.attributes;

        let backgroundImageStyle = {};

        if(focalPoint) {
            backgroundImageStyle.objectPosition = `${ focalPoint.x * 100 }% ${
                focalPoint.y * 100
            }%`;
        }

        return (
            <div className={`antares-section ${color ? 'color-' + getClassNameByColor(color) : ''}`}>
                <div className="antares-section--inner">
                    <InnerBlocks.Content />
                </div>
                {
                    image && (
                        <img src={image.url} alt={image.alt} className="background-image" style={ backgroundImageStyle }/>
                    )
                }
                {
                    image && <div className="backdrop" style={{opacity: dimRatio + '%'}}></div>
                }
            </div>
        )
    },
} );