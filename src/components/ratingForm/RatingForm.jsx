import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RatingCss from './Rating.module.css';
import { RatingModal } from './RatingModal';
import { NotificationManager } from 'react-notifications';

const RatingForm = () => {
  const [ratingValue, setRatingValue] = useState(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(true);

  const handleSubmit = async value => {
    setRatingValue(value);
    const res = await axios.post(`https://back-2cjl.onrender.com/api/rating`, {
      value,
    });
    console.log(res);
    closeModal();
  };
  function closeModal() {
    setIsRatingModalOpen(false);
  }
  useEffect(() => {
    if (ratingValue !== null) {
      setRatingValue(null);
      NotificationManager.success('Дякуємо за відгук', ' ', 3000);
    }
  }, [ratingValue]);

  return (
    <div>
      {isRatingModalOpen && (
        <RatingModal onClose={closeModal}>
          <div className={RatingCss.modalContainer}>
            <div className={RatingCss.modal}>
              <h2>Зроби оцінку застосунку</h2>
              <div className={RatingCss.buttonsBlock}>
                <button type="button" onClick={() => handleSubmit(1)}>
                  1
                </button>
                <button type="button" onClick={() => handleSubmit(2)}>
                  2
                </button>
                <button type="button" onClick={() => handleSubmit(3)}>
                  3
                </button>
                <button type="button" onClick={() => handleSubmit(4)}>
                  4
                </button>
                <button type="button" onClick={() => handleSubmit(5)}>
                  5
                </button>
              </div>
            </div>
          </div>
        </RatingModal>
      )}
    </div>
  );
};

export default RatingForm;
