!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n=n||{};n.MediaUpload=function(e){var t=null,n=!0;function o(){this.handleEvents()}return o.prototype.handleEvents=function(){e(document).on("click",'[data-action="media-replacer-replace"]',function(e){this.openFileUploader(e.target)}.bind(this)),e(document).on("click",'[data-action="media-replacer-revisions"]',(function(t){if(e(this).parents(".media-modal").length)return location.href=e(this).data("edit-link"),!1})),e(document).on("click",".media-button-new",(function(t){e(".uploader-inline-content").show(),e(".attachment-details.save-ready").hide(),e(".media-toolbar-primary .media-button-new").remove()})),e(document).on("click",".media-replace-revisions [data-restore]",(function(t){if(e(this).hasClass("selected"))return e('[name="media-replace-restore"]').val(""),void e(this).removeClass("selected");e(".media-replace-revisions li.selected").removeClass("selected");var n=e(this).data("restore");e('[name="media-replace-restore"]').val(n),e(this).addClass("selected")})),e('[data-action="media-replace-close-thickbox"]').on("click",(function(){e("#TB_closeWindowButton").trigger("click")}))},o.prototype.openFileUploader=function(n){if(!e(n).parents(".media-modal").length)return t?(t.open(),void e(".media-router a:first-of-type").trigger("click")):void this.setupFileUploader();location.href=e(n).closest("[data-edit-link]").data("edit-link")},o.prototype.setupFileUploader=function(){var o=wp.media.query({orderby:"date",query:!0,uploadedTo:-1});t=wp.media({title:"Select replacement file",button:{text:mediaReplacer.replace},multiple:!1,states:[new wp.media.controller.Library({library:o})]}),wp.Uploader.queue.on("reset",(function(){e(".uploader-inline-content").hide(),e(".media-toolbar-primary").prepend('<button type="button" class="button media-button button-primary button-large media-button-new">'+mediaReplacer.newImage+"</button>")})),t.on("select",(function(){var o=t.state().get("selection").first().toJSON().id;void 0!==o?(n=!1,e('[name="media-replacer-replace-with"]').val(o).closest("form").submit()):alert("You did not select a file. Media will not be replaced.")})),t.on("close",(function(){var o=null;void 0!==t.state().get("selection").first()&&(o=t.state().get("selection").first().toJSON().id),o&&setTimeout((function(){if(!n)return!1;e.post(ajaxurl,{action:"attachment_revisions_remove_attachment",id:o},(function(e){console.log(e)}))}),1e3)})),this.openFileUploader()},new o}(jQuery)}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2pzL2F0dGFjaG1lbnQtcmV2aXNpb25zLmpzIl0sIm5hbWVzIjpbImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiQXR0YWNobWVudFJldmlzaW9ucyIsIk1lZGlhVXBsb2FkIiwiJCIsIl9maWxlVXBsb2FkZXIiLCJfc2hvdWxkRGVsZXRlQXR0YWNobWVudCIsInRoaXMiLCJoYW5kbGVFdmVudHMiLCJkb2N1bWVudCIsIm9uIiwiZSIsIm9wZW5GaWxlVXBsb2FkZXIiLCJ0YXJnZXQiLCJwYXJlbnRzIiwibGVuZ3RoIiwibG9jYXRpb24iLCJocmVmIiwiZGF0YSIsInNob3ciLCJoaWRlIiwicmVtb3ZlIiwiaGFzQ2xhc3MiLCJ2YWwiLCJyZW1vdmVDbGFzcyIsInBhdGgiLCJhZGRDbGFzcyIsInRyaWdnZXIiLCJlbGVtZW50Iiwib3BlbiIsInNldHVwRmlsZVVwbG9hZGVyIiwiY2xvc2VzdCIsInF1ZXJ5Iiwid3AiLCJtZWRpYSIsIm9yZGVyYnkiLCJ1cGxvYWRlZFRvIiwidGl0bGUiLCJidXR0b24iLCJ0ZXh0IiwibWVkaWFSZXBsYWNlciIsInJlcGxhY2UiLCJtdWx0aXBsZSIsInN0YXRlcyIsImNvbnRyb2xsZXIiLCJMaWJyYXJ5IiwibGlicmFyeSIsIlVwbG9hZGVyIiwicXVldWUiLCJwcmVwZW5kIiwibmV3SW1hZ2UiLCJzZWxlY3RlZCIsInN0YXRlIiwiZmlyc3QiLCJ0b0pTT04iLCJpZCIsInN1Ym1pdCIsImFsZXJ0Iiwic2V0VGltZW91dCIsInBvc3QiLCJhamF4dXJsIiwiYWN0aW9uIiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiYUFDRSxJQUFJQSxFQUFtQixHQUd2QixTQUFTQyxFQUFvQkMsR0FHNUIsR0FBR0YsRUFBaUJFLEdBQ25CLE9BQU9GLEVBQWlCRSxHQUFVQyxRQUduQyxJQUFJQyxFQUFTSixFQUFpQkUsR0FBWSxDQUN6Q0csRUFBR0gsRUFDSEksR0FBRyxFQUNISCxRQUFTLElBVVYsT0FOQUksRUFBUUwsR0FBVU0sS0FBS0osRUFBT0QsUUFBU0MsRUFBUUEsRUFBT0QsUUFBU0YsR0FHL0RHLEVBQU9FLEdBQUksRUFHSkYsRUFBT0QsUUFLZkYsRUFBb0JRLEVBQUlGLEVBR3hCTixFQUFvQlMsRUFBSVYsRUFHeEJDLEVBQW9CVSxFQUFJLFNBQVNSLEVBQVNTLEVBQU1DLEdBQzNDWixFQUFvQmEsRUFBRVgsRUFBU1MsSUFDbENHLE9BQU9DLGVBQWViLEVBQVNTLEVBQU0sQ0FBRUssWUFBWSxFQUFNQyxJQUFLTCxLQUtoRVosRUFBb0JrQixFQUFJLFNBQVNoQixHQUNYLG9CQUFYaUIsUUFBMEJBLE9BQU9DLGFBQzFDTixPQUFPQyxlQUFlYixFQUFTaUIsT0FBT0MsWUFBYSxDQUFFQyxNQUFPLFdBRTdEUCxPQUFPQyxlQUFlYixFQUFTLGFBQWMsQ0FBRW1CLE9BQU8sS0FRdkRyQixFQUFvQnNCLEVBQUksU0FBU0QsRUFBT0UsR0FFdkMsR0FEVSxFQUFQQSxJQUFVRixFQUFRckIsRUFBb0JxQixJQUMvQixFQUFQRSxFQUFVLE9BQU9GLEVBQ3BCLEdBQVcsRUFBUEUsR0FBOEIsaUJBQVZGLEdBQXNCQSxHQUFTQSxFQUFNRyxXQUFZLE9BQU9ILEVBQ2hGLElBQUlJLEVBQUtYLE9BQU9Z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QUl5QyxFQUFXOUMsRUFBYytDLFFBQVFyRSxJQUFJLGFBQWFzRSxRQUFRQyxTQUFTQyxRQUNoRCxJQUFaSixHQUNQN0MsR0FBMEIsRUFDMUJGLEVBQUUsd0NBQXdDbUIsSUFBSTRCLEdBQVVwQixRQUFRLFFBQVF5QixVQUd4RUMsTUFBTSw2REFJZHBELEVBQWNLLEdBQUcsU0FBUyxXQUN0QixJQUFJeUMsRUFBVyxVQUU4QyxJQUFsRDlDLEVBQWMrQyxRQUFRckUsSUFBSSxhQUFhc0UsVUFDOUNGLEVBQVc5QyxFQUFjK0MsUUFBUXJFLElBQUksYUFBYXNFLFFBQVFDLFNBQVNDLElBR2xFSixHQUlMTyxZQUFXLFdBQ1AsSUFBS3BELEVBQ0QsT0FBTyxFQUdYRixFQUFFdUQsS0FBS0MsUUFBUyxDQUFDQyxPQUFRLHlDQUEwQ04sR0FBSUosSUFBVyxTQUFVVyxHQUN4RkMsUUFBUUMsSUFBSUYsUUFFakIsUUFJUHZELEtBQUtLLG9CQUlGLElBQUlULEVBeklvQixDQTJJaEM4RCIsImZpbGUiOiJqcy9tb2R1bGFyaXR5LWd1aWRlcy4wMGM5MTBiMDE1Yjk5Mzc1ZmVmMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsInZhciBBdHRhdGNobWVudFJldmlzaW9ucyA9IHt9O1xudmFyIEF0dGFjaG1lbnRSZXZpc2lvbnMgPSBBdHRhY2htZW50UmV2aXNpb25zIHx8IHt9O1xuQXR0YWNobWVudFJldmlzaW9ucy5NZWRpYVVwbG9hZCA9IChmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIF9maWxlVXBsb2FkZXIgPSBudWxsO1xuICAgIHZhciBfc2hvdWxkRGVsZXRlQXR0YWNobWVudCA9IHRydWU7XG5cbiAgICBmdW5jdGlvbiBNZWRpYVVwbG9hZCgpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudHMoKTtcbiAgICB9XG5cbiAgICBNZWRpYVVwbG9hZC5wcm90b3R5cGUuaGFuZGxlRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFJlcGxhY2UgbWVkaWEgYnV0dG9uXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1hY3Rpb249XCJtZWRpYS1yZXBsYWNlci1yZXBsYWNlXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkZpbGVVcGxvYWRlcihlLnRhcmdldCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gUmV2aXNpb25zIGJ1dHRvblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtYWN0aW9uPVwibWVkaWEtcmVwbGFjZXItcmV2aXNpb25zXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnBhcmVudHMoJy5tZWRpYS1tb2RhbCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAkKHRoaXMpLmRhdGEoJ2VkaXQtbGluaycpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBOZXcgSW1hZ2UgYnV0dG9uXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcubWVkaWEtYnV0dG9uLW5ldycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAkKCcudXBsb2FkZXItaW5saW5lLWNvbnRlbnQnKS5zaG93KCk7XG4gICAgICAgICAgICAkKCcuYXR0YWNobWVudC1kZXRhaWxzLnNhdmUtcmVhZHknKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcubWVkaWEtdG9vbGJhci1wcmltYXJ5IC5tZWRpYS1idXR0b24tbmV3JykucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5tZWRpYS1yZXBsYWNlLXJldmlzaW9ucyBbZGF0YS1yZXN0b3JlXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgICAgICQoJ1tuYW1lPVwibWVkaWEtcmVwbGFjZS1yZXN0b3JlXCJdJykudmFsKCcnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnLm1lZGlhLXJlcGxhY2UtcmV2aXNpb25zIGxpLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG5cbiAgICAgICAgICAgIHZhciBwYXRoID0gJCh0aGlzKS5kYXRhKCdyZXN0b3JlJyk7XG4gICAgICAgICAgICAkKCdbbmFtZT1cIm1lZGlhLXJlcGxhY2UtcmVzdG9yZVwiXScpLnZhbChwYXRoKTtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLWFjdGlvbj1cIm1lZGlhLXJlcGxhY2UtY2xvc2UtdGhpY2tib3hcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcjVEJfY2xvc2VXaW5kb3dCdXR0b24nKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgTWVkaWFVcGxvYWQucHJvdG90eXBlLm9wZW5GaWxlVXBsb2FkZXIgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIC8vJCgnLnVwbG9hZGVyLWlubGluZS1jb250ZW50Jykuc2hvdygpO1xuICAgICAgICAvLyBJZiBvcGVuZWQgZnJvbSBtZWRpYSBtb2RhbCByZWRpcmVjdCB0byBlZGl0IHBvc3QgcGFnZVxuICAgICAgICBpZiAoJChlbGVtZW50KS5wYXJlbnRzKCcubWVkaWEtbW9kYWwnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAkKGVsZW1lbnQpLmNsb3Nlc3QoJ1tkYXRhLWVkaXQtbGlua10nKS5kYXRhKCdlZGl0LWxpbmsnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfZmlsZVVwbG9hZGVyKSB7XG4gICAgICAgICAgICAvLyBPcGVuIHRoZSBtb2RhbFxuICAgICAgICAgICAgX2ZpbGVVcGxvYWRlci5vcGVuKCk7XG5cbiAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gdXBsb2FkIGZpbGUgdGFiXG4gICAgICAgICAgICAkKCcubWVkaWEtcm91dGVyIGE6Zmlyc3Qtb2YtdHlwZScpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0dXBGaWxlVXBsb2FkZXIoKTtcbiAgICB9O1xuICAgIFxuXG4gICAgTWVkaWFVcGxvYWQucHJvdG90eXBlLnNldHVwRmlsZVVwbG9hZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBxdWVyeSA9IHdwLm1lZGlhLnF1ZXJ5KHtcbiAgICAgICAgICAgIG9yZGVyYnk6ICdkYXRlJyxcbiAgICAgICAgICAgIHF1ZXJ5OiB0cnVlLFxuICAgICAgICAgICAgdXBsb2FkZWRUbzogLTFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX2ZpbGVVcGxvYWRlciA9IHdwLm1lZGlhKHtcbiAgICAgICAgICAgIHRpdGxlOiAnU2VsZWN0IHJlcGxhY2VtZW50IGZpbGUnLFxuICAgICAgICAgICAgYnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgdGV4dDogbWVkaWFSZXBsYWNlci5yZXBsYWNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICAgICAgc3RhdGVzOiBbXG4gICAgICAgICAgICAgICAgbmV3IHdwLm1lZGlhLmNvbnRyb2xsZXIuTGlicmFyeSh7XG4gICAgICAgICAgICAgICAgICAgIGxpYnJhcnk6IHF1ZXJ5XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB3cC5VcGxvYWRlci5xdWV1ZS5vbigncmVzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoJy51cGxvYWRlci1pbmxpbmUtY29udGVudCcpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5tZWRpYS10b29sYmFyLXByaW1hcnknKS5wcmVwZW5kKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBtZWRpYS1idXR0b24nICtcbiAgICAgICAgICAgICAgICAnIGJ1dHRvbi1wcmltYXJ5IGJ1dHRvbi1sYXJnZSBtZWRpYS1idXR0b24tbmV3XCI+JyttZWRpYVJlcGxhY2VyLm5ld0ltYWdlKyc8L2J1dHRvbj4nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBfZmlsZVVwbG9hZGVyLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciBzZWxlY3RlZCA9IF9maWxlVXBsb2FkZXIuc3RhdGUoKS5nZXQoJ3NlbGVjdGlvbicpLmZpcnN0KCkudG9KU09OKCkuaWQ7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdGVkICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgX3Nob3VsZERlbGV0ZUF0dGFjaG1lbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkKCdbbmFtZT1cIm1lZGlhLXJlcGxhY2VyLXJlcGxhY2Utd2l0aFwiXScpLnZhbChzZWxlY3RlZCkuY2xvc2VzdCgnZm9ybScpLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnWW91IGRpZCBub3Qgc2VsZWN0IGEgZmlsZS4gTWVkaWEgd2lsbCBub3QgYmUgcmVwbGFjZWQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF9maWxlVXBsb2FkZXIub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBfZmlsZVVwbG9hZGVyLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKS5maXJzdCgpICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBfZmlsZVVwbG9hZGVyLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKS5maXJzdCgpLnRvSlNPTigpLmlkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9zaG91bGREZWxldGVBdHRhY2htZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkLnBvc3QoYWpheHVybCwge2FjdGlvbjogJ2F0dGFjaG1lbnRfcmV2aXNpb25zX3JlbW92ZV9hdHRhY2htZW50JywgaWQ6IHNlbGVjdGVkfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3BlbkZpbGVVcGxvYWRlcigpO1xuICAgIH07XG5cblxuICAgIHJldHVybiBuZXcgTWVkaWFVcGxvYWQoKTtcblxufSkoalF1ZXJ5KTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==