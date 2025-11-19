import { User, Users } from "lucide-react"

const AvatarGroup = ({ avatars, maxVisible }) => {
    return (
        <div className="flex items-center">
            {avatars.slice(0, maxVisible).map((avatar, index) => (
                avatar !== "none" ? (
                    <img key={index} src={avatar} className={`size-6 rounded-full border border-white ${index !== 0 ? '-ml-3' : ''}`} alt="" />
                ) : (
                    <User key={index} className={`size-10 rounded-full bg-gray-300 p-2 border-2 border-white ${index !== 0 ? '-ml-3' : ''}`} />
                )
            ))}
            {
                avatars.length > maxVisible && (
                    <div className="text-blue-500/20 bg-blue-500 text-sm font-medium rounded-full border border-white size-6 flex justify-center items-center -ml-3">
                        +{avatars.length - maxVisible}
                    </div>
                )
            }
        </div>
    )
}

export default AvatarGroup
