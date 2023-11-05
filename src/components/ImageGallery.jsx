/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'
import { image1, image2, image3, image4, image5, image6, image7, image8, image9 } from '../utils/imgStore';

const ImageGallery = () => {

    const [images, setImages] = useState([
        { id: 0, image: image1, alt: 'image1', selected: false },
        { id: 1, image: image2, alt: 'image2', selected: false },
        { id: 2, image: image3, alt: 'image3', selected: false },
        { id: 3, image: image4, alt: 'image4', selected: false },
        { id: 4, image: image5, alt: 'image5', selected: false },
        { id: 5, image: image6, alt: 'image6', selected: false },
        { id: 6, image: image7, alt: 'image7', selected: false },
        { id: 7, image: image8, alt: 'image8', selected: false },
        { id: 8, image: image9, alt: 'image9', selected: false },
    ])

    const [dragging, setDragging] = useState(false);
    const [count, setCount] = useState(0);

    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    useEffect(() => {
        findSelectedImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);

    const handleSort = (e) => {
        // muted images array
        let _images = [...images];
        let imagesContent = _images.splice(dragItem.current, 1)[0]; // cut out perticular image from array
        _images.splice(dragOverItem.current, 0, imagesContent); // insert cut out image on dragover image

        // reset dragItem and dragOverItem
        dragItem.current = null;
        dragOverItem.current = null;
        // set sort image
        setImages(_images);
        // reset dragging
        setDragging(false);
    }

    const toggleImageSelection = (id) => {

        setImages((prevImage) => prevImage.map((image) => (
            // toggle image selection
            image.id === id ? { ...image, selected: !image.selected } : image
        )))

    }

    // set count
    const findSelectedImages = () => {
        images.filter((image) => image.selected) ? setCount(images.filter((image) => image.selected).length) : setCount(0)
    }


    const deleteSelectedImages = () => {
        // delete selected images from image array
        // setImages((prevImage) => prevImage.filter((image) => !image.selected))
        // delete selected images from image array and set image array to empty array

        setImages((prevImage) => prevImage.filter((image) => !image.selected))
    }


    return (
        <>
            <div className='image-gallery-header'>
                {/* if selected image exists in image array then show delete button otherwise not  */}
                {images.filter((image) => image.selected).length > 0 && <button onClick={deleteSelectedImages} className='delete-button'>Delete Images</button>}
                {
                    // if selected image exists in image array then show selected image message otherwise not
                    images.filter((image) => image.selected).length > 0 && <div className='showSelectedItem'>
                        <input checked type="checkbox" /><span>{count} Image Selected</span>
                    </div>
                }

            </div>
            <div className='image-gallery'>
                {
                    images.map((image, index) => (
                        <div
                            key={image.id}
                            className={`image-item ${index === 0 ? 'large-image' : 'small-image'} ${dragging ? 'dragging' : ''} ${image.selected ? 'selected' : ''}`}
                            draggable
                            onDragStart={(e) => (dragItem.current = index, setDragging(true))}
                            onDragEnter={(e) => dragOverItem.current = index}
                            onDragEnd={handleSort}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {/* <div className='image-overlay'></div> */}
                            <img src={image.image} alt={image.alt} />
                            <input onChange={() => toggleImageSelection(image.id)} type="checkbox" className="image-checkbox"></input>
                        </div>
                    ))
                }
            </div>
        </>

    )
}

export default ImageGallery