import Image from 'next/image';

export default function BlogAuthor ({ user }) {
    return (
                <div className="d-flex align-items-center gap-2 mb-2 px-3 pt-3">
        <Image
            src={user?.profile_pic || '/default-avatar.png'}
            alt={user?.first_name}
            width={40}
            height={40}
            className="rounded-circle"
        />
        <span className="text-muted small">
            <strong>{user?.first_name} {user?.last_name}</strong> | Published on {' '} 
            {new Date(user?.created_at).toLocaleDateString()}
        </span>
        </div>
    )
}