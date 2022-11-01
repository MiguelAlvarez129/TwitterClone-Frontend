import React, {useRef, useState} from 'react'
import { toast } from 'react-toastify';
import { Icon, IconButton, Loader, Tooltip, Whisper } from 'rsuite';


const UploadButton = ({setFiles,files}) => {
  const [loading, setLoading] = useState(false)
  const ref = useRef(null);

  const upload = async (event) => {
    const promises = [];

    if (files.length > 3){
      return toast.warning('You can only upload a maximum of 4 images')
    } 
    if (event.target.files.length >= 1) {
      for (const file of event.target.files) {
        console.log(file)
        promises.push(
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              resolve({image:reader.result,file})
            };
          })
        );
      }

      try {
        setLoading(true)
        const resolved = await Promise.all(promises)
        setFiles(files => [...files,...resolved])
      } catch (error) {
        console.log(error)
        toast.error('An error ocurred while loading the images')
      } finally {
        setLoading(false)
      }
    }
  };
  
  return (
    <>
     <label htmlFor="attachment" style={{ display: "block" }} />
          <input
            multiple={true}
            ref={ref} 
            onChange={(event) => upload(event)}
            onClick={(e) => (e.target.value = null)}
            type="file"
            accept="image/png, image/jpeg" 
            id="attachment"
            name="attachment"
            style={{ display: "none" }}
          />
          <Whisper
            placement="bottom"
            trigger="hover"
            speaker={<Tooltip>Add image</Tooltip>}
          >
            <IconButton
              onClick={() => ref.current.click()}
              style={{ paddingBottom: "auto",marginRight:'auto' }}
              icon={<Icon icon="image" style={{color:'dodgerblue'}}/>}
              size="lg"
              circle={true}
              appearance="subtle"
            />
          </Whisper>
        {loading && <Loader center size="md" backdrop />}
    </>
  )
}

export default UploadButton