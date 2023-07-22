import React from 'react';

const Comments = ({ comments }) => {

  return (
    
    <div className="modal-comments px-6 py-4">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="comment mb-4">
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <span className="ml-2 font-semibold">{comment.user.name}</span>
            </div>
            <p className="text-gray-600">
              {comment.text}
            </p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
