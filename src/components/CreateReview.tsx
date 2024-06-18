import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

import  {
    addReview
}
 from '../slice/reviewSlice';


 interface ReviewProps {
    //CreateReview component props
    hotelId: number;
    reviewId: number;
}

const CreateReview: React.FC<ReviewProps> = () => {
    const dispatch: AppDispatch = useDispatch();
    const reviews = useSelector((state: RootState) => state.reviewStore);
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addReview({...reviews}));
    };
    return (
        <div className='max-w-md mx-auto p-8'>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor='author' className='block text-sm font-medium text-gray-700'>
                        Author
                    </label>
                    <input
                        type='text'
                        id='author'
                        name='author'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='content' className='block text-sm font-medium text-gray-700'>
                        Content
                    </label>
                    <textarea
                        id='content'
                        name='content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='rating' className='block text-sm font-medium text-gray-700'>
                        Rating
                    </label>
                    <input
                        type='number'
                        id='rating'
                        name='rating'
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        required
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <button
                    type='submit'
                    className='w-full p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600'
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};
export default CreateReview;