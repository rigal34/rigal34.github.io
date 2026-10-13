import Image from "next/image";
import { identity } from "@data/profile";

export default function SocialFixedBar() {
  return (
    <div className="fixed right-3 md:right-5 bottom-0 z-30">
      <div className="flex flex-col justify-center items-center ">
        <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${identity.email}`} target="_blank" rel="noopener noreferrer" aria-label="M'écrire un e-mail">
          <Image width={30} height={30} src="/images/icons/mail.svg" alt="E-mail" className="w-6 md:w-8 mb-2 md:my-2 transition-all hover:opacity-40 transform hover:scale-75" />
        </a>
        {identity.linkedinUrl && (
          <a href={identity.linkedinUrl} aria-label="Mon profil LinkedIn">
            <Image width={30} height={30} src="/images/icons/linkedin.svg" alt="LinkedIn" className="w-6 md:w-8 mb-2 md:my-2 transition-all hover:opacity-40 transform hover:scale-75" />
          </a>
        )}
        <a href={identity.githubUrl} aria-label="Mon GitHub">
          <Image width={30} height={30} src="/images/icons/github.svg" alt="GitHub" className="w-6 md:w-8 mb-2 md:my-2 transition-all hover:opacity-40 transform hover:scale-75" />
        </a>
        <div className="h-20 md:h-52 mt-2 w-1/12 bg-slate-300"></div>
      </div>
    </div>
  )
}
