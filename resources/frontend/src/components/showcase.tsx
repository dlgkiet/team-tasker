import { motion } from "framer-motion";

const showcases = [
    {
        id: 1,
        title: "Citizen of Nowhere",
        description:
            "A clean Kanban board design with fluid layout transitions.",
        image: "https://static.shuffle.dev/components/preview/a1e10615-6acd-4c10-8b03-948ca1a14394/kanban-boards/kanban-board01.webp",
    },
    {
        id: 2,
        title: "Motion Component",
        description: "A draggable interface using React DnD Kit and Tailwind.",
        image: "https://deifkwefumgah.cloudfront.net/screenshots/thumbnail/georgegriff-react-dnd-kit-tailwind-shadcn-ui-thumbnail-2x.webp",
    },
    {
        id: 3,
        title: "-3.2K",
        description: "An analytics dashboard with smooth chart transitions.",
        image: "https://v0.dev/_next/image?url=%2Fapi%2FtzCpxJliJF3%2Fimage&w=640&q=75",
    },
];

export const Showcase = () => {
    return (
        <section className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-[#12121b] dark:via-[#1a1a30] dark:to-[#090916] py-24 px-6">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <span className="text-sm uppercase tracking-wide text-gray-400">
                    Gallery
                </span>
                <h2 className="text-4xl font-bold mb-4">Showcase</h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                    TeamTasker comes with cutting-edge innovative features just to
                    make sure that your project process smoothly{" "}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {showcases.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: index * 0.2,
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2 },
                        }}
                        className="rounded-2xl bg-black overflow-hidden shadow-lg"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 text-white">
                            <h3 className="font-semibold text-lg mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
