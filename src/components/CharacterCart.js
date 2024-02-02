import { IoMale, IoFemale } from "react-icons/io5";
import { GrStatusUnknown } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { useState } from 'react';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CharacterCart = ({ character, isFavorite, onToggleFavorite, favCount, fromEpsiode }) => {
  const notAlive = character.status === "Dead";
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleFavorite = () => {
    if (isFavorite) {
      handleOpenDeleteModal();
      return;
    }
    if (favCount > 9 && !isFavorite) {   
      toast.error("You have reached the favorite character limit", {
        position: "top-right"
      });
      return;
    }

    onToggleFavorite(character.id);
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    onToggleFavorite(character.id);
    setDeleteModalOpen(false);
  };

  return (
<div onClick={()=>{
  if(fromEpsiode) {
    navigate(`/character/${character.id}`)

  }
  }} className={`w-full h-full relative border hover:scale-105 border-gray-300 cursor-pointer duration-300  ${notAlive && "filter grayscale"}`}>

    {
      !fromEpsiode &&
      <div onClick={handleToggleFavorite} className="absolute right-[.5rem] top-[.5rem] z-[1]">
        <FaHeart className={`w-[2rem] h-[2rem] ${isFavorite ? 'text-red-500' : 'text-gray-300'}`}/>
      </div>
    }

      <div className="w-full h-64 relative">
        <img
          className="w-full h-full  object-fit"
          src={character?.image}
          alt={character?.name}
        />
      </div>
      <div className="p-5 flex flex-col">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">{character.name} ({character.species})</h2>
          {character.gender === "Male" ? (
            <IoMale className="text-green w-[1.5rem] h-[1.5rem]" />
          ) : character.gender === "Female" ? (
            <IoFemale className="text-green w-[1.5rem] h-[1.5rem]" />
          ) : (
            <GrStatusUnknown className="text-green w-[1.5rem] h-[1.5rem]" />
          )}
        </div>
        <span className="text-sm font-bold text-black">
          {character.location.name}
        </span>
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onRequestClose={handleCloseDeleteModal}
          onConfirmDelete={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default CharacterCart;
