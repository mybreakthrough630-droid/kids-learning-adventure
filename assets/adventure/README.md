# Adventure scene artwork

Created with the built-in image generation tool, 1 October 2026.
Final assets: scene-01.png through scene-20.png, in this directory.

Final prompt set: the following template was used once per numbered scene, replacing `{number}` and `{scene}` with the values below.

> Use case: illustration-story. Asset type: children's observation game scene background {number}. Scene: {scene}. Create one beautiful wide landscape children's picture-book painting, polished soft 3D storybook realism, charming detailed setting, warm colors and natural light. Human characters should look like believable real Hong Kong people, children with adults where appropriate, friendly and fully clothed. Animals if appropriate. Single coherent scene only, no pair, no panels, no text, no numbers, no game UI. Keep an uncluttered area across the foreground ground for six additional interactive objects to be overlaid later. View frontal wide angle, foreground occupies bottom half. Distinct architecture and environmental details suited to this setting.

1. 公園野餐與香港家庭
2. 巴士站與街道
3. 學校操場
4. 溫馨客廳
5. 海灘假日
6. 動物農場
7. 糖果小店
8. 城市街市
9. 圖書館
10. 生日派對
11. 花園種植
12. 火車月台
13. 機場大堂
14. 水族館
15. 動物園
16. 雪地公園
17. 家庭廚房
18. 單車公園
19. 消防局
20. 遊樂場

## Exact-difference construction

Each pair uses the same background file. Six deterministic vector objects are layered on top, with five differences in level 1 and six in levels 2–5. Levels 1–2 use side-by-side comparison; levels 3–5 hide the original after 12, 8, or 5 seconds. Only specified object colors or presence change. This prevents incidental differences in generated faces, furniture, lighting, or foliage. SVG shape and candy tokens are native game UI art, not generated screenshots of controls. Both panels display the original bitmap at 1.55× zoom with matching crop origins, preserving all original pixels.

## Verification

Run `node scripts/test-adventure.cjs` from the project root. Tests cover all four modes at all five levels, correct and incorrect answers, eight-slot capacity, replay, explicit next-stage activation, and all 20 scene definitions. Browser checks additionally cover visible controls and actual click feedback.
