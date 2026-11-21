import { serializeWhiteboardFile } from "@/utils/whiteboardDatei";
import type { WhiteboardObject } from "@/types/whiteboard";

export const IMAGE_DRAWER_WIDTH = 640;
export const IMAGE_DRAWER_HEIGHT = 400;
export const IMAGE_DRAWER_TITLE = "Exercise image";

export function drawnImageJson(objects: WhiteboardObject[]): string {
	return serializeWhiteboardFile(IMAGE_DRAWER_TITLE, objects);
}

export async function svgToPngDataUrl(
	svg: SVGSVGElement,
	width = IMAGE_DRAWER_WIDTH,
	height = IMAGE_DRAWER_HEIGHT,
): Promise<string> {
	const clone = svg.cloneNode(true) as SVGSVGElement;
	clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	clone.setAttribute("width", String(width));
	clone.setAttribute("height", String(height));
	clone.setAttribute("viewBox", `0 0 ${width} ${height}`);
	clone.removeAttribute("class");

	clone.querySelectorAll(".wb-export-hidden").forEach((node) => node.remove());

	const background = clone.querySelector(".wb-canvas__hintergrund");
	if (background) {
		background.setAttribute("fill", "#ffffff");
		background.setAttribute("width", String(width));
		background.setAttribute("height", String(height));
	} else {
		const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rect.setAttribute("x", "0");
		rect.setAttribute("y", "0");
		rect.setAttribute("width", String(width));
		rect.setAttribute("height", String(height));
		rect.setAttribute("fill", "#ffffff");
		clone.insertBefore(rect, clone.firstChild);
	}

	const text = new XMLSerializer().serializeToString(clone);
	const url = URL.createObjectURL(new Blob([text], { type: "image/svg+xml;charset=utf-8" }));
	try {
		const image = new Image();
		await new Promise<void>((resolve, reject) => {
			image.onload = () => resolve();
			image.onerror = () => reject(new Error("The drawing could not be converted to a PNG."));
			image.src = url;
		});

		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		const context = canvas.getContext("2d");
		if (!context) throw new Error("No canvas context is available for the PNG export.");
		context.fillStyle = "#ffffff";
		context.fillRect(0, 0, width, height);
		context.drawImage(image, 0, 0, width, height);
		return canvas.toDataURL("image/png");
	} finally {
		URL.revokeObjectURL(url);
	}
}
