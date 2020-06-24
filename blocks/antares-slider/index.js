import './style.scss';
import './editor.scss';

import Slider from 'react-slick'

const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaPlaceholder, InspectorControls, BlockControls, MediaUpload } = wp.blockEditor
const { ColorPalette, PanelBody, PanelRow, IconButton, Button, Toolbar, FocalPointPicker, RangeControl } = wp.components;

const emtpySlide = {
    image: null,
    description: ''
}

const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false
};

console.log('antares liste')

registerBlockType( 'antares/slider', {
    title: 'Antares Slider',
    icon: 'list-view',
    category: 'layout',
    example: {},
    attributes: {
        slides: {
            type: "array",
            default: [
                Object.assign({}, emtpySlide)
            ]
        },
    },
    supports: {
        align: ['wide']
    },

    edit(props) {
        const {setAttributes, attributes, isSelected} = props;
        const {slides} = attributes;

        const updateSlideItem = (data, index) => {
            const newSlide = Object.assign({}, slides[index], data);

            const newSlides = [...slides];

            newSlides[index] = newSlide;

            setAttributes({slides: newSlides});
        }

        const addNewItem = () => {
            const newItems = [...slides, Object.assign({}, emtpySlide)]

            setAttributes({slides: newItems});
        }

        console.log({slides});

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Slides" initialOpen={true}>
                        <PanelRow>
                            <ul>
                                {
                                    slides.map((slide, index) => {
                                        const label = slide.description ? slide.description.substring(0, 10) : 'Slide ' + (index + 1);
                                        
                                        return (
                                            <li>
                                                { label }

                                                {
                                                    slides.length !== 1 && (
                                                        <Button
                                                            isSecondary
                                                            isSmall
                                                            style={{marginLeft: "5px"}}
                                                            onClick={ () =>{
                                                                let newSlides = [...slides];
                                                                newSlides.splice(index, 1)
                                                                setAttributes({slides: newSlides})
                                                            }}
                                                        >
                                                            メ
                                                        </Button>
                                                    )
                                                }
                                            </li>
                                        )
                                    })
                                }

                                <li>
                                    <IconButton 
                                        icon="plus"
                                        label="Slide hinzufügen"
                                        onClick={() => {addNewItem()}}
                                        />
                                </li>
                            </ul>
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                <Slider className="antares-slider" {...sliderSettings}>
                    {
                        slides.map((slide, index) => {
                            return (
                                <div className="slide" key={slide.index}>
                                    {
                                        slide.image ? (
                                            <MediaUpload
                                                allowedTypes={["image/jpg", "image/jpeg", "image/png"]}
                                                value={slide.image ? slide.image.id : null}
                                                onSelect={(image) => updateSlideItem( { image }, index )}
                                                render={({ open }) => (
                                                    <img src={slide.image.sizes.large ? slide.image.sizes.large.url : slide.image.url} alt={slide.image.alt} onClick={open}/>
                                                )}
                                            />
                                        ) : (
                                            <MediaPlaceholder
                                                onSelect = {
                                                    ( image ) => {
                                                        updateSlideItem( { image }, index );
                                                    }
                                                }
                                                allowedTypes = { [ 'image' ] }
                                                multiple = { false }
                                                labels = { { title: 'Bild auswählen oder hochladen' } }>
                                            </MediaPlaceholder>
                                        )
                                    }
                                    <div className="content">
                                        <RichText
                                            tagName="p" // The tag here is the element output and editable in the admin
                                            value={ slide.title } // Any existing content, either from the database or an attribute default
                                            formattingControls={ [ 'bold' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
                                            onChange={ ( title ) => updateSlideItem( { title }, index ) } // Store updated content as a block attribute
                                            placeholder={ 'Beschreibung...' } // Display this text before any content has been added by the user
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </Fragment>
        );
    },
    save(props) {
        const {slides} = props.attributes;
        console.log({slides});
        return (
            <div className={`antares-slider `}>
                    {
                        slides.map((slide, index) => {
                            return (
                                <div className="slide">
                                    {
                                        slide.image && (
                                            <img src={slide.image.url} alt={slide.image.alt} className={'wp-image-' + slide.image.id}/>
                                        ) 
                                    }
                                    {
                                        slide.title && (
                                            <div className="content">
                                                <RichText.Content
                                                    tagName="p" // The tag here is the element output and editable in the admin
                                                    value={ slide.title } // Any existing content, either from the database or an attribute default
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
            </div>
        )
    },
} );