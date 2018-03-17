// Wrap bindings in anonymous namespace to prevent collisions
jQuery(function($) {
    "use strict";
    var CMP_SELECTOR = ".cmp-image--border",
        DATA_PROCESSED = "data-image-processed",
        IMG_SELECTOR = ".cmp-image__image",
        IMG_CONTAINER = ".cmp-image";
        

 function applyComponentStyles() {

  //Top Level Navigation (expected to only be one of these)
  $(CMP_SELECTOR).not("[" + DATA_PROCESSED + "='true']").each(function() {
            // Mark the component element as processed to avoid the cyclic processing (see .not(..) above).
            var component = $(this).attr(DATA_PROCESSED, true),
            image = $(this).find(IMG_SELECTOR),
            imgContainer = $(this).find(IMG_CONTAINER),
            title;
            if(image !== undefined) {
                title = $(image).attr("title");
                imgContainer.append("<div class='border-box-highlight'></div>");
                component.append("<div class='speakerTitle'>" + title + "</div>");
            }
          
          });
    }

  applyComponentStyles();
  
  $(".responsivegrid").bind("DOMNodeInserted", applyComponentStyles);
});