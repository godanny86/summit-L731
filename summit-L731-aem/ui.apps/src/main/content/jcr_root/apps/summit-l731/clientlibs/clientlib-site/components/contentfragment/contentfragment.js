//Wrap bindings in anonymous namespace to prevent collisions
jQuery(function($) {
	"use strict";
	var PROCESSED_CF = "data-cf-processed", 
		IMAGE_ELEMENT = ".cmp-contentfragment__element--speakerImage",
		DOB_ELEMENT = ".cmp-contentfragment__element--speakerDOB",
		CF_ELEMENT_VALUE = ".cmp-contentfragment__element-value",
		THUMBNAIL_RENDITION = "/_jcr_content/renditions/cq5dam.thumbnail.319.319.png";

	function applyComponentStyles() {

		//Top Level Navigation (expected to only be one of these)
		$(".cmp-cf-speaker").not("[" + PROCESSED_CF + "='true']").each(
				function() {
					// Mark the component element as processed to avoid the cyclic processing (see .not(..) above).
					var cf = $(this).attr(PROCESSED_CF, true), 
						imageEl = $(cf).find(IMAGE_ELEMENT),
						imageValue, 
						imageSrc,
						dobEl = $(cf).find(DOB_ELEMENT),
						dobValue;
						

					if (imageEl !== undefined) {
						imageValue = $(imageEl).find(CF_ELEMENT_VALUE);
						imageSrc = $(imageValue).text().trim();

						if (imageSrc !== undefined) {
							$(this).prepend(
									"<div class='cmp-speaker-img'><img alt='speaker photo'" + "src='"
											+ imageSrc + THUMBNAIL_RENDITION
											+ "' /> <div class='border-box-highlight' /></div>");
						}
					}
					
					if(dobEl !== undefined) {
						dobValue = $(dobEl).find(CF_ELEMENT_VALUE);
						if(dobValue !== undefined) {
							dobValue.text(dobValue.text().trim().substring(0, 10));
						}
					}
				});
	}

	applyComponentStyles();

	$(".responsivegrid").bind("DOMNodeInserted", applyComponentStyles);
});