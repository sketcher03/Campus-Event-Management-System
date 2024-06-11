'use client'

import { FileUploadProps } from '@/types'
import { useCallback } from 'react'
import { FileWithPath } from 'react-dropzone';

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from '../ui/button';
import { convertFileToUrl } from '@/lib/utils';

const FileUploader = (props: FileUploadProps) => {

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        props.setFiles(acceptedFiles);
        props.onFieldChange(convertFileToUrl(acceptedFiles[0]));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
    });

    return (
        <div {...getRootProps()} className="flex-center flex h-72 cursor-pointer flex-col overflow-hidden rounded-lg bg-amber-50 border-[1px] border-orange-200">
            <input {...getInputProps()} className='cursor-pointer' />
            {
                props.image ? (
                    <div className="flex h-full w-full flex-1 justify-center ">
                        <img
                            src={props.image}
                            alt="image"
                            width={250}
                            height={250}
                            className="w-full object-cover object-center"
                        />
                    </div>
                ): (
                    <div className="flex-center flex-col py-5 text-orange-600">
                        <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
                        <h3 className="mb-2 mt-2">Drag Image here</h3>
                            <p className="p-medium-12">PNG, JPG</p>
                            <p className="p-medium-12 mb-4 text-orange-400">Maximum File Size: 4MB</p>
                        <Button type="button" className="rounded-lg bg-orange-600 hover:bg-orange-700">
                            Select from computer
                        </Button>
                    </div>
                )
            }
        </div>
    );
}

export default FileUploader