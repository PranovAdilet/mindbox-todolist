import { useEffect, useRef, useState } from "react";

export const useOutside = (handleSubmit: () => void) => {
   const ref = useRef<HTMLLIElement>(null);
   const [isEdit, setIsEdit] = useState(false);

   const toggleShow = () => {
      setIsEdit((prev) => !prev);
   };

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (ref.current && !ref.current.contains(event.target as Node)) {

            if (isEdit) handleSubmit()

            setIsEdit(false);
         }
      };

      if (isEdit) {
         document.addEventListener("click", handleClickOutside);
      } else {
         document.removeEventListener("click", handleClickOutside);
      }
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [isEdit, handleSubmit]);

   return { ref, isEdit, toggleShow, setIsEdit };
};
