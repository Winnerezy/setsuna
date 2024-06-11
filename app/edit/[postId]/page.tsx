'use client'

import { TextareaAutosize } from '@mui/base';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useFetchFeed } from '../../../hooks/useFetchFeed';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { ImageIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function editPost() {

  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);

  const { user } = useContext(AuthContext) // logged in user data

  const router = useRouter();

  const { postId } = useParams()

  const handleInput = () => {
    setContent(contentRef.current.value);
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        setPhoto(binaryStr);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handlePost = async () => {
    try {
      setLoading(true);
      const options = {
        Accept: "application/json",
      };

      const body = {
        postId,
        content,
        photo,
      };
      const res = await axios.put("/api/post", body, { headers: options });
      if (res.status !== 201) {
        throw new Error("Error found");
      }

      setContent("");
      setPhoto(null);
      router.back()
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPost = async() => {
    try {
        const res = await fetch(`/api/post/${user.username}/${postId}`, { headers: {
            Accept: 'application/json'       
           } })
        const ans =  await res.json()
        setPhoto(ans.photo)
        setContent(ans.content)
    } catch (error) {
        console.error(error)
    } 
  }
  useEffect(()=> {
    fetchPost()
  }, [])

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
        <article className="flex flex-col justify-between p-4 flex-grow w-full max-w-[600px] min-h-[400px] border-[var(--global-border-bg)] border bg-[var(--global-post-bg)] rounded-[20px] items-center space-y-8">
          <section className="relative flex flex-col w-full items-center justify-center">
          <section className="flex flex-col w-full gap-y-2">
            <div className="w-full flex items-center justify-between px-2">
              <div {...getRootProps()} className='w-full'>
                <input {...getInputProps()} accept="image/*" />
                <div className='w-full flex-grow min-h-[200px] flex items-center justify-center flex-col hover:opacity-80'>
                { photo ? 
                <img
                  src={photo}
                  className={`${
                    photo ? "flex" : "hidden"
                  } size-[100%] max-h-[500px] flex-grow rounded-[20px] object-cover`}
                />
                :
                <div className='w-full h-[200px] flex flex-col items-center justify-center rounded-[20px] border-2 border-[var(--global-border-bg)]'>
                  <ImageIcon className="size-10" />
                  <p className='text-center'>Click to add photo</p>
                </div>
                }
                </div>
              </div>
            </div>
          </section>
            <div className="flex flex-col size-full items-center">
              <TextareaAutosize
                className="bg-transparent outline-none p-2 w-full max-w-[600px] flex-grow resize-none"
                placeholder="Share your experience...."
                value={content}
                onChange={handleInput}
                ref={contentRef}
                maxLength= {300}
                />
            </div>
            <p className="absolute right-0 -bottom-4 text-sm">{ content.length }/300</p>
          </section>

          <button
                className="border-[var(--global-border-bg)] border rounded-[20px] hover:opacity-80 disabled:opacity-70 disabled:text-[#e4e4e4] text-center p-1 w-36 h-10 font-semibold text-sm self-end"
                onClick={handlePost}
                disabled={loading}
              >
                Post
          </button>
        </article>
    </div>
  )
}
