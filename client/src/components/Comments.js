import React, { useEffect, useState } from 'react';
import RoleIcon from './RoleIcon';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Comments = ({ comments, handleAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleAddNewComment = async () => {
    await handleAddComment(newComment);
    setNewComment('');
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  useEffect(() => {
    if (newComment.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newComment]);

  const formattedCreatedAt = (createdAt) => {
    return new Date(createdAt).toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    
    <div className="modal-comments px-6 py-4">
      <h3 className="text-xl font-semibold mb-4 mt-8 items-center"> <FontAwesomeIcon icon={faComments} /> Comments <span className="text-gray-500 text-sm ml-2"> ({comments.length}) </span></h3>
      {comments.map((comment) => (
        <div key={comment._id} className="comment mb-4 ml-4 items-center">
            <div className="flex items-center mb-2">
            <RoleIcon role={comment.user.role} />
            <span className="ml-2 font-semibold mr-2">{comment.user.lastName + ' ' + comment.user.firstName}</span>
            <span className="text-gray-500 text-sm">{formattedCreatedAt(comment.createdAt)}</span>
            </div>
            <p className="text-gray-600 ml-8">
              {comment.text}
            </p>
        </div>
      ))}
       <textarea
          rows="3" // You can adjust the number of rows here to control the input's height
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      <button
        onClick={handleAddNewComment}
        className={`px-4 py-2 border ${
          isDisabled ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-blue-500 text-blue-500'
        } hover:bg-blue-500 hover:text-white rounded-lg transition-colors mt-2`}
        disabled={isDisabled}
      >
        Add Comment
      </button>
    </div>
  );
};

export default Comments;
