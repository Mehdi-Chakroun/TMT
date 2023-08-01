import React from 'react';
import RoleIcon from './RoleIcon';
const Comments = ({ comments }) => {
  const currentUser = localStorage.getItem('role');
  console.log('Comments:', comments);
  return (
    
    <div className="modal-comments px-6 py-4">
      <h3 className="text-xl font-semibold mb-4">Comments <span className="text-gray-500 text-sm ml-2"> ({comments.length}) </span></h3>
      {comments.map((comment) => (
        <div key={comment._id} className="comment mb-4 items-center">
            <div className="flex items-center mb-2">
            <RoleIcon role={comment.user.role} />
            <span className="ml-2 font-semibold mr-2">{comment.user.lastName + ' ' + comment.user.firstName}</span>
            </div>
            <p className="text-gray-600 ml-8">
              {comment.text}
            </p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
