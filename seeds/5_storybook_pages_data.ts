import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("storybook_pages").del();

    // Inserts seed entries
    await knex("storybook_pages").insert([
        {
            storybook_id: "1",
            page_number: "1",
            caption: "Yuko the cat woke up with a jolt, feeling a burst of excitement bubbling inside her. She quickly crawled out of bed, ready for an adventurous day!",
            image: "1716804439458.jpeg",
            prompt: "Draw Yuko, a young female cat with a petite body shape and short height size, in her cozy and colorful bedroom. She has big round eyes with long eyelashes that give her a cute and innocent appearance. Yuko is wearing a colorful sundress and a flower-shaped hair clip as an accessory. The color theme of the illustration consists of primary colors like pink, yellow, and blue, along with secondary colors like purple and green. Her fur has stripes as distinctive markings, and the overall gradient shading is soft. The drawing style should be Pixar-like, with clean linework and an intermediate level of detail. The color palette should be vibrant, enhancing the lively atmosphere of the scene. Use a watercolor medium to bring out the desired effect. Yuko is shown in a medium-shot camera angle, demonstrating her excitement as she crawls out of bed to start her adventurous day."
        },
        {
            storybook_id: "1",
            page_number: "2",
            caption: "Yuko dashed out to her sunny backyard. Her eyes sparkled with determination as she spotted a tall tree calling out to her. With a leap, she started climbing higher and higher, eager to see the world from up above.",
            image: "1716804467534.jpeg",
            prompt: "Generate an image of Yuko, a young female cat with big round eyes, long eyelashes, and a petite body shape. She is wearing a colorful sundress and a flower-shaped hair clip. The primary colors of the color theme are pink, yellow, and blue, while the secondary colors are purple and green. Yuko has distinctive stripes on her fur, and the shading should be soft, creating a gentle gradient effect. The art style should resemble Pixar, with clean linework and an intermediate level of detail. The color palette should be vibrant, and the medium used should be watercolor. The intended use of the illustration is for children, and it should depict Yuko in her sunny backyard. She is shown climbing a tall tree with determination. The camera angle should be a wide shot, capturing the entire scene. The prompt description is as follows: Draw Yuko, a young female cat with big round eyes and long eyelashes. She has a petite body shape and is wearing a colorful sundress with a flower-shaped hair clip. Her fur has distinctive stripes, and the shading should be soft with a gradient effect. The art style should resemble Pixar, with clean linework and an intermediate level of detail. The color palette should be vibrant, and the medium used should be watercolor. The illustration is intended for children and should depict Yuko in her sunny backyard. She is climbing a tall tree with determination, eager to see the world from up above."
        },
        {
            storybook_id: "1",
            page_number: "3",
            caption: "Running through a beautiful meadow, Yuko giggled with joy as she spotted a group of fluttering butterflies. She couldn't resist the temptation and started chasing them around, her paws lightly touching the soft grass.",
            image: "1716804489932.jpeg",
            prompt: "Draw Yuko, a young female cat with a petite body shape and short height, wearing a colorful sundress and a flower-shaped hair clip. Her big round eyes, adorned with long eyelashes, gaze excitedly at the scene before her. The primary colors of the setting are pink, yellow, and blue, while the secondary colors are purple and green. Yuko has distinctive striped markings on her fur. The grassy meadow by the shimmering lake serves as the backdrop. With a Pixar art style, the illustration showcases clean linework and an intermediate level of detail. The vibrant color palette and watercolor medium enhance the lively atmosphere. Yuko's emotions radiate pure joy as she engages in her favorite activity of chasing colorful butterflies. The camera angle captures a full shot of Yuko running through the meadow, her paws delicately touching the soft grass."
        },
        {
            storybook_id: "1",
            page_number: "4",
            caption: "Venturing into a mysterious forest, Yuko's curiosity grew stronger. She sniffed the air and followed a narrow path, her eyes wide open with anticipation. Every step she took revealed new surprises and intriguing secrets.",
            image: "1716804523344.jpeg",
            prompt: `Draw Yuko, a young female cat with a petite body shape and short height size, wearing a colorful sundress and a flower-shaped hair clip. She has big round eyes with long eyelashes. The primary colors of the color theme are pink, yellow, and blue, while the secondary colors are purple and green. Yuko's body has stripes as pattern markings, and there is a soft gradient shading in the illustration. The art style is Pixar, with clean linework and an intermediate level of detail. The color palette is vibrant, and the medium used for the illustration is watercolor. The intended use of the illustration is for children. 

            The scenario is set in a mysterious forest, where Yuko is engaged in the activity of exploring hidden paths. Her emotion is curiosity, and the camera angle for the illustration is a wide-shot. The description of the scenario is as follows: Venturing into a mysterious forest, Yuko's curiosity grew stronger. She sniffed the air and followed a narrow path, her eyes wide open with anticipation. Every step she took revealed new surprises and intriguing secrets.`
        },
        {
            storybook_id: "1",
            page_number: "5",
            caption: "In a bustling marketplace, Yuko's heart filled with warmth as she noticed scared and lonely animals who had lost their owners. With a gentle touch, she guided them, showing them the way home, her eyes brimming with kindness.",
            image: "1716804550790.jpeg",
            prompt: `Draw Yuko, a female cat with a petite body shape and short height, wearing a colorful sundress with a flower-shaped hair clip. She has big round eyes and long eyelashes. The color theme consists of primary colors like pink, yellow, and blue, along with secondary colors like purple and green. Yuko's body has stripes as pattern markings, and the shading is done with a soft gradient. The art style should be similar to Pixar, with clean linework and intermediate level of detail. Use a vibrant color palette and the medium of watercolor.

            The illustration depicts Yuko in a bustling marketplace, where she is engaged in the activity of helping lost animals find their way. Her expression radiates kindness as she gently guides these scared and lonely animals, showing them the way home. Her eyes are brimming with warmth, and the camera angle is a close-up of Yuko's face.
            
            Create an illustration of Yuko in the bustling marketplace, helping lost animals with her kindheartedness.`
        },
        {
            storybook_id: "1",
            page_number: "6",
            caption: "As the sun began to set, Yuko followed a familiar path back to her cozy bedroom. With each step, a sense of contentment washed over her, knowing that she had filled her adventurous day with thrilling experiences and happy memories.",
            image: "1716804580769.jpeg",
            prompt: "Create an illustration of Yuko, a female child cat with a petite body shape and short height. She has big round eyes, long eyelashes, and wears a colorful sundress with a flower-shaped hair clip. The primary colors of the color theme are pink, yellow, and blue, while the secondary colors are purple and green. Yuko has distinctive striped markings and the artwork should have soft gradient shading. The chosen art style is Pixar, with clean linework and intermediate detail level. Use a vibrant color palette and the medium of watercolor. The intended use of the illustration is for children, specifically depicting Yuko returning to her cozy bedroom. She is portrayed in a medium-shot camera angle, exuding contentment. The description emphasizes the setting sun, Yuko's familiar path, and her sense of fulfillment after a day filled with thrilling experiences and happy memories."
        },
        {
            storybook_id: "2",
            page_number: "1",
            caption: "Loki the sheep happily pranced through the sunny meadow, jumping over colorful hurdles with a big smile on his face. The wide-shot captured his cheerful spirit as he gracefully leaped over each obstacle.",
            image: "1716802439047.jpeg",
            prompt: "Draw Loki the teenage male sheep, a slim and short character with fluffy white wool. He is wearing a colorful t-shirt and shorts, along with a wristband. The scene is set in a sunny meadow filled with vibrant flowers and tall grass. Loki is joyful and prances happily through the meadow, jumping over colorful hurdles. His expression is accompanied by a big smile, and the camera angle captures this playful activity in a wide-shot. His distinctive features, such as his fluffy white wool, are beautifully highlighted in the watercolor art style. The clean linework and intermediate level of detail bring the cartoon illustration to life, while the gradient shading seamlessly transitions from light to dark. The color palette features vibrant primary colors, with hints of green and striped pattern markings. Create an illustration of Loki gracefully leaping over each hurdle, perfectly capturing his cheerful spirit."
        },
        {
            storybook_id: "2",
            page_number: "2",
            caption: "Deep in the lush forest, Loki spotted a juicy apple hanging high up on a tall tree. With a determined look, he swiftly climbed the tree trunk branch by branch. The full-shot showed Loki's persistence and the beautiful surroundings filled with chirping birds.",
            image: "1716802477857.jpeg",
            prompt: "Generate an image of Loki, a male teenage sheep, in a dense forest with towering trees and chirping birds. He has a slim body shape and is of short height. Loki is wearing a colorful t-shirt and shorts, along with a wristband. His distinctive feature is his fluffy white wool. The forest has a color theme of blue and green, with stripes and light to dark gradient shading. The art style is cartoon with clean linework and intermediate detail level. The color palette is vibrant, resembling watercolor medium. The intended use is for illustrating to a children's audience. In this scenario, Loki is climbing a tall tree to reach a juicy apple. He shows determination as he swiftly climbs the tree trunk branch by branch. The camera angle is a full-shot showcasing Loki's persistence and the beautiful surroundings with chirping birds."
        },
        {
            storybook_id: "2",
            page_number: "3",
            caption: "Loki and his friends hopped onto a sturdy raft, ready for an exciting river adventure. They maneuvered through the rushing waters, their expressions of delight captured in close-up shots. Loki couldn't contain his excitement as they splashed and laughed together.",
            image: "1716802504934.jpeg",
            prompt: "Generate an image of Loki, a male teenage sheep with a slim, short stature and distinctive fluffy white wool. He is wearing a colorful t-shirt, shorts, and a wristband. The primary colors of the color theme are blue, and the secondary colors are green with striped pattern markings and a light to dark gradient shading. The drawing style is a vibrant cartoon with clean linework, intermediate detail level, and a watercolor color palette. The intended use of the illustration is for children. The scenario is set in a sparkling river rushing through a rocky canyon. Loki and his friends are rafting downstream, filled with excitement. The camera angle is close-up, capturing their expressions of delight as they maneuver through the rushing waters. Loki cannot contain his excitement as they splash and laugh together."
        },
        {
            storybook_id: "2",
            page_number: "4",
            caption: "Inside the enchanting cave, Loki discovered a puzzle that would unlock a hidden treasure chest. With a curious mind, he carefully examined the clues and solved the riddles. Each medium-shot showcased Loki's concentration and the mesmerizing glow of the colorful crystals surrounding him.",
            image: "1716802533808.jpeg",
            prompt: "Create an illustration of Loki, a male teenage sheep with a slim body shape and short height. Loki has distinctive features of fluffy white wool and wears a colorful t-shirt and shorts along with a wristband. The artwork should be in a cartoon art style with clean linework and intermediate detail level. The color palette should be vibrant, resembling a watercolor painting. The primary colors used should be blue, while the secondary colors should be green. The pattern markings should consist of stripes, and the artwork should incorporate a light-to-dark gradient shading. The purpose of this illustration is to target children as the audience. The scenario is set in a mysterious cave glowing with colorful crystals. Loki is engaged in solving puzzles to open a hidden treasure chest. He feels curious throughout the activity. The camera angle should capture Loki in a medium-shot, highlighting his concentration and the mesmerizing glow of the colorful crystals surrounding him."
        },
        {
            storybook_id: "2",
            page_number: "5",
            caption: "In the lively market, Loki met new friends who taught him a joyful dance. With a beaming smile, Loki joined the festive celebration, his energetic movements captured in full-shot. The colorful market and lively music added to the excitement of the moment.",
            image: "1716802555543.jpeg",
            prompt: `Draw Loki, a male teenage sheep with a slim body shape, short height, and distinctive fluffy white wool. Loki is wearing a colorful t-shirt and shorts, accessorized with a wristband. The primary color theme of the illustration is blue, with secondary colors in green. Loki has stripes as pattern markings, and the shading gradient goes from light to dark. The art style is a clean cartoon, with an intermediate level of detail and a vibrant color palette resembling watercolor. The intended use of this illustration is for children. 

            Generate an image of Loki in a bustling market with vibrant stalls and lively music. He is seen joyfully performing a dance with new friends. Loki's expression is ecstatic, with a beaming smile on his face. The camera angle captures him in a full-shot, showcasing his energetic movements. The market is colorful, adding to the excitement of the moment.`
        },
        {
            storybook_id: "2",
            page_number: "6",
            caption: "As the sun set over the peaceful farm, Loki gathered with his farm animal friends to share stories and laughter. The wide-shot depicted the warm atmosphere, with Loki expressing contentment as they all enjoyed each other's company, surrounded by the beauty of the golden sunset.",
            image: "1716802590656.jpeg",
            prompt: "Create an illustration of Loki, a teenage male sheep, in a peaceful farm bathed in a golden sunset. Loki has a slim body shape and is of short height, adorned with fluffy white wool. He is wearing a colorful t-shirt and shorts along with a wristband. The primary colors of the color theme are blue, complemented by secondary colors of green, incorporating stripes as pattern markings and a gradient shading that transitions from light to dark. The drawing style should be a cartoon with clean linework, an intermediate level of detail, and a vibrant color palette resembling watercolor. This illustration is intended for children. Loki is engaged in the activity of sharing stories and laughter with his farm animal friends. The scene is captured in a wide-shot, portraying a warm atmosphere where Loki and his companions are content and enjoy each other's company, surrounded by the breathtaking beauty of the golden sunset."
        },
        {
            storybook_id: "3",
            page_number: "1",
            caption: "Money the Robot is in his backyard, planting colorful flowers. He can't wait to see them grow and bloom!",
            image: "1717130873916.jpeg",
            prompt: `Draw Money the Robot, a muscular and short teenage robot with glowing eyes, wearing a red hoodie and jeans, and a baseball cap. The primary colors of the illustration should be vibrant red and blue, and the robot should have stripes for pattern markings and a gradient shading effect. The art style should resemble Pixar's clean linework with an intermediate level of detail, using a vibrant color palette reminiscent of watercolor. The intended use of this illustration is for children's entertainment.

            The scene is set in Money's backyard, where he is planting colorful flowers with excitement. The camera angle should capture a wide-shot of the entire backyard. Money is eagerly tending to the flowers, carefully placing them in the soil and watering them. He can't wait to see these flowers grow and bloom into a beautiful display of colors.`
        },
        {
            storybook_id: "3",
            page_number: "2",
            caption: "Money the Robot is in the kitchen, baking delicious cookies. The sweet smell fills the air as Money smiles with joy.",
            image: "1717130899236.jpeg",
            prompt: `Create an illustration of Money the Robot, a muscular teenage male robot with a short stature, wearing a hoodie and jeans, and a baseball cap. He has distinctive glowing eyes. The color theme consists of primary colors of red and secondary colors of blue, with striped pattern markings and gradient shading. The drawing style should be in a clean, intermediate level Pixar art style, with vibrant watercolor color palette. The intended use is for an illustration targeted at children.

            In the scenario, Money the Robot is in his kitchen, filled with the sweet aroma of freshly baked cookies. He is shown happily baking the delicious cookies. The camera angle should be a full-shot, capturing Money's joyful expression as he smiles while baking the cookies.`
        },
        {
            storybook_id: "3",
            page_number: "3",
            caption: "Money the Robot is in his cozy living room, determined to solve a challenging puzzle. He concentrates, trying to fit all the pieces together.",
            image: "1717130931253.jpeg",
            prompt: `Draw Money the Robot, a muscular teenage robot with short height, wearing a red hoodie and jeans along with a baseball cap. He has distinctive glowing eyes. Use a clean Pixar-style art style with intermediate detail level and vibrant watercolor palette. The primary colors should be red and the secondary colors should be blue, with striped pattern markings and gradient shading.

            The intended use of the illustration is for children. The scenario is set in Money's cozy living room where he is focused on building a puzzle with determination. The camera angle is a medium-shot. Money the Robot concentrates as he tries to fit all the puzzle pieces together.`
        },
        {
            storybook_id: "3",
            page_number: "4",
            caption: "Money the Robot is at the playground, swinging high on the swing. His laughter fills the air as he enjoys the feeling of flying.",
            image: "1717130972515.jpeg",
            prompt: "Generate an image of Money the Robot, a muscular short teenager with glowing eyes. He is wearing a red hoodie and jeans, along with a baseball cap. The primary colors of the image are red, and the secondary colors are blue, with stripes as pattern markings. The image follows a clean linework with an intermediate level of detail. The art style resembles Pixar animations, with vibrant colors from a watercolor palette. The intended use of the image is for an illustration targeted at children. The scenario is set in Money's playground, where he is seen swinging on the swing. The emotion portrayed is joy, with a close-up camera angle capturing his laughter filling the air while he enjoys the feeling of flying."
        },
        {
            storybook_id: "3",
            page_number: "5",
            caption: "Money the Robot is in the city park, playing a lively game of soccer with friends from different cultures. They cheer and have lots of fun!",
            image: "1717131008695.jpeg",
            prompt: "Draw Money the Robot, a muscular teenage male robot with short stature and distinctive glowing eyes, wearing a hoodie, jeans, and a baseball cap. He has a pixar art style with clean linework and intermediate detail level. The color palette is vibrant, featuring primary colors of red and secondary colors of blue, with striped pattern markings and gradient shading. Money the Robot is playing a lively game of soccer in a city park, surrounded by friends from different cultures. They are filled with excitement, cheering and having lots of fun. Capture this wide-shot scene and create an illustration that is intended for children to enjoy."
        },
        {
            storybook_id: "3",
            page_number: "6",
            caption: "Money the Robot is in an art class, using bright colors to paint a beautiful picture. His imagination takes him on a creative journey.",
            image: "1717131034406.jpeg",
            prompt: "Create an illustration of Money the Robot, a short and muscular teenage robot with glowing eyes, wearing a hoodie and jeans along with a baseball cap. He is in an art class, surrounded by vibrant primary and secondary colors with striped pattern markings and gradient shading. The art style is reminiscent of Pixar, featuring clean linework and intermediate detail level, resembling a watercolor medium. Money the Robot is fully captured in a colorful full-shot camera angle. He is deeply engrossed in the activity of painting a picture, showcasing his creativity and imagination as he takes a wonderful artistic journey."
        },
        {
            storybook_id: "3",
            page_number: "7",
            caption: "Money the Robot is in the library, reading an exciting book about different cultures. He is curious to learn about people from all over the world.",
            image: "1717131071129.jpeg",
            prompt: "Draw Money the Robot, a muscular teenage male robot with short height, in a library. He is wearing a red hoodie and jeans, and a baseball cap. His distinctive feature is his glowing eyes. The library has a color theme of red as primary colors and blue as secondary colors, with striped pattern markings and gradient shading. The drawing style should be Pixar-esque, with clean linework, intermediate detail level, vibrant color palette, and a medium-shot camera angle. Money the Robot is shown reading an exciting book about different cultures. His emotion is curiosity as he eagerly learns about people from all over the world."
        },
        {
            storybook_id: "3",
            page_number: "8",
            caption: "Money the Robot is on a big stage, performing a vibrant dance with friends from different cultures. Their smiles show the joy of embracing diversity.",
            image: "1717131096227.jpeg",
            prompt: `Draw Money the Robot, a muscular and short male teenager with glowing eyes. He is wearing a hoodie and jeans, along with a baseball cap. The color theme consists of vibrant primary red and secondary blue colors, including stripes and gradient shading. The art style should resemble Pixar, with clean linework and an intermediate level of detail. Use a vibrant color palette and a watercolor medium.

            The prompt is to generate an illustration of Money the Robot performing a dance on a big stage. He is accompanied by friends from different cultures, expressing happiness. The camera angle should be a close-up, capturing their joyful smiles and the vibrant energy of their dance. The illustration should convey the message of embracing diversity.`
        },
        {
            storybook_id: "4",
            page_number: "1",
            caption: "Pinky the Gnome skipped merrily through the magical forest, carrying a basket full of colorful flowers. With each step, his eyes sparkled with excitement. The wide-shot captured Pinky's vibrant enthusiasm as he reached for the perfect spot to plant his beautiful blooms.",
            image: "1717130632618.jpeg",
            prompt: `Draw Pinky the Gnome, an elderly female gnome with a chubby body shape and average height. Pinky has rosy cheeks and oversized spectacles. She is wearing a patterned dress and apron, along with a flower-shaped hat. The color theme should be predominantly pink and purple, with polka dot markings and no gradient shading. The drawing style should resemble Pixar animations, with clean linework and an intermediate level of detail. Use a vibrant color palette and watercolor as the medium.

            In the illustration, Pinky is in a magical forest, feeling excited. The camera angle should be a wide-shot to capture the scene. Pinky is skipping merrily through the forest, carrying a basket filled with colorful flowers. Her eyes are sparkling with excitement as she looks for the perfect spot to plant the beautiful blooms.`
        },
        {
            storybook_id: "4",
            page_number: "2",
            caption: "Pinky's curious nature led him to a glistening stream. He gathered leaves, twigs, and petals to build a tiny boat. As he placed the final touch, a pink petal sail, his face lit up with curiosity. The full-shot showcased Pinky's meticulous boat-building skills and his eagerness to explore the sparkling waters.",
            image: "1717130631682.jpeg",
            prompt: `Draw Pinky, an elderly female Gnome with rosy cheeks and oversized spectacles, wearing a patterned dress and apron, and a flower-shaped hat. She has a chubby body shape and an average height. The color theme should be primarily pink with secondary colors of purple, polka dots for pattern markings, and no gradient shading. The drawing style should reflect a Pixar art style with clean linework, intermediate detail level, vibrant color palette, and a medium of watercolor.

            The intended use of the illustration is for children, and the scenario is set by a glistening stream. Pinky's emotion is curiosity, and the camera angle should be a full-shot.
            
            In the illustration, Pinky is shown building a tiny boat by the glistening stream. She gathers leaves, twigs, and petals meticulously, carefully placing each piece to construct the boat. Her curious nature is evident as she focuses on her creation, her face lighting up with excitement and wonder. The final touch is a pink petal sail, adding an extra touch of whimsy to the boat. The full-shot emphasizes Pinky's boat-building skills and showcases her eagerness to explore the sparkling waters of the stream.
            
            Create an illustration of Pinky, the elderly female Gnome, joyfully building a tiny boat by a glistening stream.`
        },
        {
            storybook_id: "4",
            page_number: "3",
            caption: "Pinky and his newfound friend, Bella the Butterfly, giggled inside their cozy treehouse. They rolled dough and sprinkled colorful sugar on freshly baked cookies. Pinky's delighted laughter filled the air, and the medium-shot captured their joyful teamwork as they shared the mouth-watering treats.",
            image: "1717130663142.jpeg",
            prompt: `Draw Pinky, an elderly female Gnome with rosy cheeks and oversized spectacles. She is chubby and of average height, wearing a patterned dress and apron along with a flower-shaped hat. The color theme includes primary colors of pink and secondary colors of purple, with polka dot pattern markings and no gradient shading. Use a Pixar art style with clean linework, intermediate detail level, vibrant color palette, and watercolor medium.

            The intended use is for an illustration targeted at children. The scenario is set inside a cozy treehouse, where Pinky and her newfound friend, Bella the Butterfly, are baking delicious cookies. The emotion is joy, and the camera angle is a medium shot. 
            
            In the illustration, Pinky and Bella giggle as they roll dough and sprinkle colorful sugar on freshly baked cookies. Pinky's delighted laughter fills the air, depicting their joyful teamwork as they share the mouth-watering treats.`
        },
        {
            storybook_id: "4",
            page_number: "4",
            caption: "With a strong breeze on a sunny day, Pinky's happiness soared high as he held onto a vibrant kite. The camera focused on Pinky's beaming face, medium-close-up, capturing the pure joy radiating from his eyes as the kite danced and spun in the clear blue sky.",
            image: "1717130646569.jpeg",
            prompt: `Draw Pinky, an elderly female Gnome with a chubby body shape and rosy cheeks, wearing oversized spectacles, a flower-shaped hat, a patterned dress, and an apron. The primary colors of the color theme should be pink, with secondary colors in purple, and polka dots as the pattern markings. The drawing style should resemble Pixar, with clean linework, intermediate detail level, and a vibrant color palette in a watercolor medium.

            Create an illustration of Pinky on a green meadow, happily flying a vibrant kite. The scene is set on a sunny day with a strong breeze. The camera angle should be a medium-close-up, focusing on Pinky's beaming face. Capture the pure joy radiating from her eyes as the kite dances and spins in the clear blue sky.`
        },
        {
            storybook_id: "4",
            page_number: "5",
            caption: "Pinky and his friends gathered under the twinkling stars, sitting around a crackling campfire. They shared enchanting stories of faraway places. Pinky's face lit up with wonder as he listened attentively, captivated by the magical tales. The full-shot embraced the cozy atmosphere, highlighting the friendship-filled night.",
            image: "1717130637599.jpeg",
            prompt: `Create an illustration of Pinky, an elderly female Gnome with rosy cheeks and oversized spectacles, wearing a patterned dress and apron, and a flower-shaped hat. She has a chubby body shape and an average height. The color theme should consist of primary colors in pink, secondary colors in purple, polka dots pattern markings, and no gradient shading. The art style should be Pixar, with clean linework, intermediate detail level, vibrant color palette, and created using watercolor medium. The intended use of the illustration is for children. The scenario is set under a starry night, where Pinky and her friends gather around a campfire. They engage in the activity of telling stories, evoking a sense of wonder. The camera angle is a full-shot, capturing the cozy atmosphere and highlighting the friendship-filled night.`
        },
        {
            storybook_id: "4",
            page_number: "6",
            caption: "Pinky and his friends encountered a wide river blocking their path. With unwavering determination, Pinky took the lead and gathered stones and logs to build a friendship bridge. The close-up shot focused on Pinky's resolute expression as he worked tirelessly, showcasing his determination to overcome any obstacle for the sake of friendship.",
            image: "1717130629611.jpeg",
            prompt: `Draw Pinky, an elderly female Gnome with rosy cheeks and oversized spectacles. She has a chubby body shape and stands at an average height. Pinky is wearing a patterned dress and apron, paired with a flower-shaped hat as an accessory. The color theme revolves around pink as the primary color and purple as the secondary color, with polka dots as the pattern markings. There is no gradient shading, and the drawing follows Pixar's art style. The linework is clean, with an intermediate level of detail and a vibrant color palette. The medium used for the illustration is watercolor. The intended use is for an illustration aimed at children.

            The scenario depicts Pinky building a friendship bridge. With a determined expression, she takes the lead, gathering stones and logs to construct the bridge. Her unwavering determination to overcome any obstacle for the sake of friendship is showcased in a close-up shot, emphasizing Pinky's resolute expression as she works tirelessly.
            
            Create an illustration of Pinky, the elderly female Gnome, building a friendship bridge, showcasing her determination.`
        },
    ]);
};