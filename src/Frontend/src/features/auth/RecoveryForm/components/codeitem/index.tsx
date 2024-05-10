import React, { ChangeEvent } from "react";
import "./index.css";

interface CodeItemProps {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CodeItem: React.FC<CodeItemProps> = ({ otp, setOtp }) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");

    e.target.value = e.target.value.toUpperCase();

    const newOtp = [
      ...otp.map((data, indx) => (indx === index ? e.target.value : data)),
    ];
    setOtp(newOtp);

    if (e.target.value && e.target.nextSibling instanceof HTMLInputElement) {
      e.target.nextSibling.focus();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    const arrowKeys = ["ArrowLeft", "ArrowRight"];
    if (arrowKeys.includes(e.key)) {
      e.preventDefault();
      const direction = e.key === "ArrowLeft" ? -1 : 1;
      const newIndex = index + direction;
      const nextInput = document.querySelector(
        `input[type="text"][data-index="${newIndex}"]`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    } else if (e.key === "Backspace") {
      e.preventDefault();
      const currentValue = e.currentTarget.value;
      const updatedValue = currentValue.substring(0, currentValue.length - 1);
      const newOtp = [...otp];
      newOtp[index] = updatedValue;
      setOtp(newOtp);

      if (index > 0) {
        const prevIndex = index - 1;
        const prevInput = document.querySelector(
          `input[type="text"][data-index="${prevIndex}"]`
        ) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }
    } else {
      const currentValue = e.currentTarget.value;
      if (currentValue.length === 1) {
        e.currentTarget.value = "";
        setOtp([...otp.slice(0, index), "", ...otp.slice(index + 1)]);
      }
    }
  }

  function handlePaste(
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData("text");
    const pastedText = clipboardData.replace(/[^a-zA-Z0-9]/g, "");
    const newOtp = [...otp];
    let i = index;
    for (const char of pastedText) {
      if (i >= newOtp.length) break;
      newOtp[i] = char.toUpperCase();
      i++;
    }
    setOtp(newOtp);
  }

  return (
    <div className="otp-area">
      {otp.map((data, i) => {
        return (
          <input
            required
            autoFocus={i === 0}
            key={i}
            type="text"
            value={data}
            maxLength={1}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={(e) => handlePaste(e, i)}
            data-index={i}
          />
        );
      })}
    </div>
  );
};
