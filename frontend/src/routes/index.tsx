import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

const popUpAnimationVariants = {
  hidden: {
    opacity: 0,
    translateY: "50px",
    scale: 0.75,
  },
  visible: (custom: number) => {
    return {
      opacity: 1,
      translateY: "-50px",
      scale: 1,
      transition: { delay: custom || 0 },
    };
  },
};

function Index() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center mashcode-landing -z-10">
      <div className="mashcode font-bold text-9xl flex">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={popUpAnimationVariants}
        >
          Mash
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={popUpAnimationVariants}
          custom={0.1}
        >
          Code
        </motion.div>
      </div>
      <motion.div
        variants={popUpAnimationVariants}
        initial="hidden"
        animate="visible"
        custom={0.25}
        className="text-4xl"
      >
        Compile & Conquer
      </motion.div>
      <motion.div
        className="button-group flex gap-4 mt-8"
        variants={popUpAnimationVariants}
        initial="hidden"
        animate="visible"
        custom={0.4}
      >
        <Button
          className="hover:shadow-[rgba(255,_255,_255,_0.5)_0px_25px_50px_-12px] transition-all duration-100 text-lg py-6 px-10"
          variant="default"
          size="lg"
        >
          Let's Play!
        </Button>
        <Button
          className="bg-transparent border border-primary text-lg py-6 px-10"
          variant="secondary"
          size="lg"
        >
          Practice
        </Button>
      </motion.div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});
