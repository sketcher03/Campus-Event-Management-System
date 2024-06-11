'use client'

import { FileUploadProps } from '@/types'
import { useCallback } from 'react'
import { FileWithPath } from 'react-dropzone';

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from '../ui/button';
import { convertFileToUrl } from '@/lib/utils';
import { MonitorUp } from 'lucide-react';

const CoverUploader = (props: FileUploadProps) => {

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
                ) : (
                    <div className="flex-center flex-col py-5 text-orange-600">
                        <MonitorUp className="mr-4 h-[77px] w-[77px] text-orange-400" />
                        <h3 className="mb-2 mt-2">Drag Image here</h3>
                        <p className="p-medium-12">PNG, JPG</p>
                        <p className="p-medium-12 mb-4 text-orange-400">Maximum File Size: 4MB</p>
                        <Button type="button" variant="outline" className="rounded-lg border-2 border-orange-400 hover:bg-orange-500 hover:text-white">
                            Select from computer
                        </Button>
                    </div>
                )
            }
        </div>
    );
}

export default CoverUploader