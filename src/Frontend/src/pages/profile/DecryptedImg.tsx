import { FC, useState, useEffect } from "react";
import { decryptImage } from "../../entities/sharedStores/post-utils";

const DecryptedImg: FC<{ content: string, className?: string, borderRadius?: string, size?: string }> = ({
    content,
    className,
    borderRadius= "10px",
    size = '50px',
}) => {
    const [image, setImage] = useState<any>(null);

    useEffect(() => {
        decryptImage(content).then(setImage).catch(console.error);
    }, []);

    const imgStyles = {

        width: size !== "noset" ? size : undefined,
        height: size !== "noset" ? size : undefined,
        borderRadius: borderRadius ?? undefined,
    };

    return (
        <img className={className} style={imgStyles} src={image} />
    );
};

export default DecryptedImg;
