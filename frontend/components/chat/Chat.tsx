  "use client";

  export default function Chat({ user, text }: ChatProps) {
    const userName = user === "orca" ? "Orca" : "User";
    const textCss = user === "orca" ? "font-light text-primary" : "font-light text-primary";
  
    return (
      <div className="p-4 flex flex-col">
        <p className="font-bold">{userName}:</p>
        <p className={`${textCss} ml-2 whitespace-pre-wrap`}>{text}</p>
      </div>
    );
  }
  