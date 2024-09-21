"use client";
import Image from "next/image";
import { Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ModalProps = {
    modalContent: { src: string, width: number, height: number };
    onClose: () => void;
};

export default function Modal({ modalContent, onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black bg-opacity-90 p-4">
            <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                <span className="sr-only">Close modal</span>
                <Minimize2 className="w-6 h-6" />
            </Button>
            <Image
                src={modalContent.src}
                width={modalContent.width}
                height={modalContent.height}
                alt="Modal content"
                className="block w-full max-w-[90vw] max-h-[80vh] object-contain"
            />
        </div>
    );
}
