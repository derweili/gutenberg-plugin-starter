import './style.scss';

const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, BlockControls, MediaUpload } = wp.blockEditor
const { ColorPalette, PanelBody, PanelRow, IconButton, Button, Toolbar, FocalPointPicker, RangeControl } = wp.components;

const emptyListItem = {
    title: '',
    description: ''
}

console.log('antares liste')

registerBlockType( 'antares/list', {
    title: 'Antares Liste',
    icon: 'list-view',
    category: 'layout',
    example: {},
    attributes: {
        listItems: {
            type: "array",
            default: [
                Object.assign({}, emptyListItem)
            ]
        },
    },
    supports: {
        align: ['wide']
    },

    edit(props) {
        const {setAttributes, attributes, isSelected} = props;
        const {listItems} = attributes;

        const updateListItem = (data, index) => {
            const newItem = Object.assign({}, listItems[index], data);

            const newItems = [...listItems];

            newItems[index] = newItem;

            setAttributes({listItems: newItems});
        }

        const addNewItem = () => {
            const newItems = [...listItems, Object.assign({}, emptyListItem)]

            setAttributes({listItems: newItems});
        }

        return (
            <Fragment>
                <div className={`antares-list `}>
                    {
                        listItems.map((listItem, index) => {
                            return (
                                <div className="list-item">
                                    <div className="item-number h2">
                                        {index + 1}
                                    </div>
                                    <div className="item-content">
                                        <RichText
                                            tagName="h3" // The tag here is the element output and editable in the admin
                                            value={ listItem.title } // Any existing content, either from the database or an attribute default
                                            formattingControls={ [ 'bold', 'italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
                                            onChange={ ( title ) => updateListItem( { title }, index ) } // Store updated content as a block attribute
                                            placeholder={ 'Titel...' } // Display this text before any content has been added by the user
                                        />
                                        {
                                            (isSelected || listItem.description !== '') && (
                                                <RichText
                                                    tagName="p" // The tag here is the element output and editable in the admin
                                                    value={ listItem.description } // Any existing content, either from the database or an attribute default
                                                    formattingControls={ [ 'bold', 'italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
                                                    onChange={ ( description ) => updateListItem( { description }, index ) } // Store updated content as a block attribute
                                                    placeholder={ 'Beschreibung...' } // Display this text before any content has been added by the user
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <IconButton
                        className="components-toolbar__control"
                        label={"Plus"}
                        icon="plus"
                        onClick={() => addNewItem()}
                    />
                </div>
            </Fragment>
        );
    },
    save(props) {
        const {listItems} = props.attributes;
        return (
            <div className={`antares-list `}>
                    {
                        listItems.map((listItem, index) => {
                            return (
                                <div className="list-item">
                                    <div className="item-number h2">
                                        {index + 1}
                                    </div>
                                    <div className="item-content">
                                        <RichText.Content
                                            tagName="h3" // The tag here is the element output and editable in the admin
                                            value={ listItem.title } // Any existing content, either from the database or an attribute default
                                        />
                                        {
                                            listItem.description && (
                                                <RichText.Content
                                                    tagName="p" // The tag here is the element output and editable in the admin
                                                    value={ listItem.description } // Any existing content, either from the database or an attribute default
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
        )
    },
} );