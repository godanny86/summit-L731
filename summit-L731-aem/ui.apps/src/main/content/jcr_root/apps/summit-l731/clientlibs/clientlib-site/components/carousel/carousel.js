// Wrap bindings in anonymous namespace to prevent collisions
jQuery(function($) {
    "use strict";
    var EXTENSION = "/_jcr_content/root/responsivegrid.model.json",
        THUMBNAIL_RENDITION = "/_jcr_content/renditions/cq5dam.thumbnail.319.319.png";

 function applyComponentStyles() {

  //Top Level Navigation (expected to only be one of these)
  $(".cmp-carousel-slider").not("[data-carousel-processed='true']").each(function() {
            // Mark the component element as processed to avoid the cyclic processing (see .not(..) above).
            var carousel = $(this).attr("data-carousel-processed", true),
            jsonURI = $(carousel).data('api-path') + EXTENSION,
            section = $(this).find('.regular');
            
           
            
            $.getJSON(jsonURI, function(result){
            $.each(result, function(index, element) {
             if(index === ":items") {
                $.each(element, function(cfindex, cfragment) {
                    $(section).append("<div><a class='cmp-speaker-img' href='" + cfragment.elements.speakerPage.value + ".html'><div class='speaker-img'><img src='" + cfragment.elements.speakerImage.value + THUMBNAIL_RENDITION + "' /><div class='border-box-highlight'></div></div><h4>" + cfragment.elements.speakerName.value + "</h4></a></div>");
                   });
                }
              });
            }).done(function() {
            $(section).slick({
                 dots: true,
                 infinite: true,
                 slidesToShow: 3,
                 slidesToScroll: 3
             });
           });
          });
    }

  applyComponentStyles();
  
  $(".responsivegrid").bind("DOMNodeInserted", applyComponentStyles);
});