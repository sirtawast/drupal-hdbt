/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkhdbt"] = self["webpackChunkhdbt"] || []).push([["navToggleDropdown"],{

/***/ "./src/js/nav-toggle/nav-toggle-dropdown.js":
/*!**************************************************!*\
  !*** ./src/js/nav-toggle/nav-toggle-dropdown.js ***!
  \**************************************************/
/***/ (function(module) {

eval("class NavToggleDropdown {\n  constructor() {\n    this.HASH_ID = null;\n    this.buttonSelector = null;\n    this.buttonInstance = null;\n    this.running = false;\n    this.targetNode = null;\n    this.onOpen = null;\n  }\n  isOpen() {\n    return window.location.hash === this.HASH_ID || this.targetNode.dataset.target === 'true';\n  }\n  close() {\n    if (this.running) {\n      this.buttonInstance.setAttribute('aria-expanded', 'false');\n      this.targetNode.dataset.target = 'false';\n      if (this.onClose) {\n        this.onClose();\n      }\n    }\n  }\n  open() {\n    if (this.running) {\n      this.buttonInstance.setAttribute('aria-expanded', 'true');\n      this.targetNode.dataset.target = 'true';\n      if (this.onOpen) {\n        this.onOpen();\n      }\n    }\n  }\n  toggle() {\n    if (this.isOpen()) {\n      this.close();\n    } else {\n      this.open();\n    }\n    this.buttonInstance.focus();\n  }\n  addListeners() {\n    // Close menu on ESC\n    document.addEventListener('keydown', e => {\n      if ((e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) && this.isOpen()) {\n        this.close();\n        this.buttonInstance.focus();\n      }\n    });\n\n    // Toggle menu from button\n    this.buttonInstance.addEventListener('click', () => {\n      this.toggle();\n    });\n  }\n  init({\n    name,\n    buttonSelector,\n    targetSelector,\n    onOpen,\n    onClose\n  }) {\n    this.name = name;\n    this.buttonSelector = buttonSelector;\n    this.buttonInstance = document.querySelector(this.buttonSelector);\n    if (!this.buttonInstance) {\n      this.running = false;\n      // eslint-disable-next-line no-console\n      console.warn(`${name} button missing. Looking for ${this.buttonSelector}`);\n      return;\n    }\n    if (this.running) {\n      // eslint-disable-next-line no-console\n      console.warn(`${name} already initiated. Is it included more than once?`);\n      return;\n    }\n    this.HASH_ID = targetSelector;\n    this.onOpen = onOpen;\n    this.onClose = onClose;\n\n    // This used to load after DOM was loaded, but we added defer for the javascript.\n    // so the check was removed.\n\n    // Enhance nojs version with JavaScript\n    this.targetNode = document.querySelector(this.HASH_ID);\n    if (!this.targetNode) {\n      throw new Error(`${name} target node missing. Looking for ${this.HASH_ID}`);\n    }\n    // Hide nojs menu links, show button instead.\n    this.targetNode.dataset.js = true;\n    this.addListeners();\n    this.running = true;\n  }\n}\nmodule.exports = () => new NavToggleDropdown();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvbmF2LXRvZ2dsZS9uYXYtdG9nZ2xlLWRyb3Bkb3duLmpzLmpzIiwibmFtZXMiOlsiTmF2VG9nZ2xlRHJvcGRvd24iLCJjb25zdHJ1Y3RvciIsIkhBU0hfSUQiLCJidXR0b25TZWxlY3RvciIsImJ1dHRvbkluc3RhbmNlIiwicnVubmluZyIsInRhcmdldE5vZGUiLCJvbk9wZW4iLCJpc09wZW4iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhhc2giLCJkYXRhc2V0IiwidGFyZ2V0IiwiY2xvc2UiLCJzZXRBdHRyaWJ1dGUiLCJvbkNsb3NlIiwib3BlbiIsInRvZ2dsZSIsImZvY3VzIiwiYWRkTGlzdGVuZXJzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleSIsImtleUNvZGUiLCJpbml0IiwibmFtZSIsInRhcmdldFNlbGVjdG9yIiwicXVlcnlTZWxlY3RvciIsImNvbnNvbGUiLCJ3YXJuIiwiRXJyb3IiLCJqcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VicGFjazovL2hkYnQvLi9zcmMvanMvbmF2LXRvZ2dsZS9uYXYtdG9nZ2xlLWRyb3Bkb3duLmpzP2M0ZjQiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTmF2VG9nZ2xlRHJvcGRvd24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLkhBU0hfSUQgPSBudWxsO1xuICAgIHRoaXMuYnV0dG9uU2VsZWN0b3IgPSBudWxsO1xuICAgIHRoaXMuYnV0dG9uSW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgIHRoaXMudGFyZ2V0Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5vbk9wZW4gPSBudWxsO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gdGhpcy5IQVNIX0lEIHx8IHRoaXMudGFyZ2V0Tm9kZS5kYXRhc2V0LnRhcmdldCA9PT0gJ3RydWUnO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKHRoaXMucnVubmluZykge1xuICAgICAgdGhpcy5idXR0b25JbnN0YW5jZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgIHRoaXMudGFyZ2V0Tm9kZS5kYXRhc2V0LnRhcmdldCA9ICdmYWxzZSc7XG4gICAgICBpZiAodGhpcy5vbkNsb3NlKSB7XG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgaWYgKHRoaXMucnVubmluZykge1xuICAgICAgdGhpcy5idXR0b25JbnN0YW5jZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgdGhpcy50YXJnZXROb2RlLmRhdGFzZXQudGFyZ2V0ID0gJ3RydWUnO1xuICAgICAgaWYgKHRoaXMub25PcGVuKSB7XG4gICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgICB0aGlzLmJ1dHRvbkluc3RhbmNlLmZvY3VzKCk7XG4gIH1cblxuICBhZGRMaXN0ZW5lcnMoKSB7XG4gICAgLy8gQ2xvc2UgbWVudSBvbiBFU0NcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgIGlmICgoZS5rZXkgPT09ICdFc2NhcGUnIHx8IGUua2V5ID09PSAnRXNjJyB8fCBlLmtleUNvZGUgPT09IDI3KSAmJiB0aGlzLmlzT3BlbigpKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5idXR0b25JbnN0YW5jZS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gVG9nZ2xlIG1lbnUgZnJvbSBidXR0b25cbiAgICB0aGlzLmJ1dHRvbkluc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoeyBuYW1lLCBidXR0b25TZWxlY3RvciwgdGFyZ2V0U2VsZWN0b3IsIG9uT3Blbiwgb25DbG9zZSB9KSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmJ1dHRvblNlbGVjdG9yID0gYnV0dG9uU2VsZWN0b3I7XG4gICAgdGhpcy5idXR0b25JbnN0YW5jZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5idXR0b25TZWxlY3Rvcik7XG4gICAgaWYgKCF0aGlzLmJ1dHRvbkluc3RhbmNlKSB7XG4gICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oYCR7bmFtZX0gYnV0dG9uIG1pc3NpbmcuIExvb2tpbmcgZm9yICR7dGhpcy5idXR0b25TZWxlY3Rvcn1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucnVubmluZykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihgJHtuYW1lfSBhbHJlYWR5IGluaXRpYXRlZC4gSXMgaXQgaW5jbHVkZWQgbW9yZSB0aGFuIG9uY2U/YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5IQVNIX0lEID0gdGFyZ2V0U2VsZWN0b3I7XG4gICAgdGhpcy5vbk9wZW4gPSBvbk9wZW47XG4gICAgdGhpcy5vbkNsb3NlID0gb25DbG9zZTtcblxuICAgIC8vIFRoaXMgdXNlZCB0byBsb2FkIGFmdGVyIERPTSB3YXMgbG9hZGVkLCBidXQgd2UgYWRkZWQgZGVmZXIgZm9yIHRoZSBqYXZhc2NyaXB0LlxuICAgIC8vIHNvIHRoZSBjaGVjayB3YXMgcmVtb3ZlZC5cblxuICAgIC8vIEVuaGFuY2Ugbm9qcyB2ZXJzaW9uIHdpdGggSmF2YVNjcmlwdFxuICAgIHRoaXMudGFyZ2V0Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5IQVNIX0lEKTtcbiAgICBpZiAoIXRoaXMudGFyZ2V0Tm9kZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke25hbWV9IHRhcmdldCBub2RlIG1pc3NpbmcuIExvb2tpbmcgZm9yICR7dGhpcy5IQVNIX0lEfWApO1xuICAgIH1cbiAgICAvLyBIaWRlIG5vanMgbWVudSBsaW5rcywgc2hvdyBidXR0b24gaW5zdGVhZC5cbiAgICB0aGlzLnRhcmdldE5vZGUuZGF0YXNldC5qcyA9IHRydWU7XG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKTtcblxuICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiBuZXcgTmF2VG9nZ2xlRHJvcGRvd24oKTtcbiJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsaUJBQWlCLENBQUM7RUFDdEJDLFdBQVcsR0FBRztJQUNaLElBQUksQ0FBQ0MsT0FBTyxHQUFHLElBQUk7SUFDbkIsSUFBSSxDQUFDQyxjQUFjLEdBQUcsSUFBSTtJQUMxQixJQUFJLENBQUNDLGNBQWMsR0FBRyxJQUFJO0lBQzFCLElBQUksQ0FBQ0MsT0FBTyxHQUFHLEtBQUs7SUFDcEIsSUFBSSxDQUFDQyxVQUFVLEdBQUcsSUFBSTtJQUN0QixJQUFJLENBQUNDLE1BQU0sR0FBRyxJQUFJO0VBQ3BCO0VBRUFDLE1BQU0sR0FBRztJQUNQLE9BQU9DLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLEtBQUssSUFBSSxDQUFDVCxPQUFPLElBQUksSUFBSSxDQUFDSSxVQUFVLENBQUNNLE9BQU8sQ0FBQ0MsTUFBTSxLQUFLLE1BQU07RUFDM0Y7RUFFQUMsS0FBSyxHQUFHO0lBQ04sSUFBSSxJQUFJLENBQUNULE9BQU8sRUFBRTtNQUNoQixJQUFJLENBQUNELGNBQWMsQ0FBQ1csWUFBWSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUM7TUFDMUQsSUFBSSxDQUFDVCxVQUFVLENBQUNNLE9BQU8sQ0FBQ0MsTUFBTSxHQUFHLE9BQU87TUFDeEMsSUFBSSxJQUFJLENBQUNHLE9BQU8sRUFBRTtRQUNoQixJQUFJLENBQUNBLE9BQU8sRUFBRTtNQUNoQjtJQUNGO0VBQ0Y7RUFFQUMsSUFBSSxHQUFHO0lBQ0wsSUFBSSxJQUFJLENBQUNaLE9BQU8sRUFBRTtNQUNoQixJQUFJLENBQUNELGNBQWMsQ0FBQ1csWUFBWSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUM7TUFDekQsSUFBSSxDQUFDVCxVQUFVLENBQUNNLE9BQU8sQ0FBQ0MsTUFBTSxHQUFHLE1BQU07TUFDdkMsSUFBSSxJQUFJLENBQUNOLE1BQU0sRUFBRTtRQUNmLElBQUksQ0FBQ0EsTUFBTSxFQUFFO01BQ2Y7SUFDRjtFQUNGO0VBRUFXLE1BQU0sR0FBRztJQUNQLElBQUksSUFBSSxDQUFDVixNQUFNLEVBQUUsRUFBRTtNQUNqQixJQUFJLENBQUNNLEtBQUssRUFBRTtJQUNkLENBQUMsTUFBTTtNQUNMLElBQUksQ0FBQ0csSUFBSSxFQUFFO0lBQ2I7SUFDQSxJQUFJLENBQUNiLGNBQWMsQ0FBQ2UsS0FBSyxFQUFFO0VBQzdCO0VBRUFDLFlBQVksR0FBRztJQUNiO0lBQ0FDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsU0FBUyxFQUFHQyxDQUFDLElBQUs7TUFDMUMsSUFBSSxDQUFDQSxDQUFDLENBQUNDLEdBQUcsS0FBSyxRQUFRLElBQUlELENBQUMsQ0FBQ0MsR0FBRyxLQUFLLEtBQUssSUFBSUQsQ0FBQyxDQUFDRSxPQUFPLEtBQUssRUFBRSxLQUFLLElBQUksQ0FBQ2pCLE1BQU0sRUFBRSxFQUFFO1FBQ2hGLElBQUksQ0FBQ00sS0FBSyxFQUFFO1FBQ1osSUFBSSxDQUFDVixjQUFjLENBQUNlLEtBQUssRUFBRTtNQUM3QjtJQUNGLENBQUMsQ0FBQzs7SUFFRjtJQUNBLElBQUksQ0FBQ2YsY0FBYyxDQUFDa0IsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07TUFDbEQsSUFBSSxDQUFDSixNQUFNLEVBQUU7SUFDZixDQUFDLENBQUM7RUFDSjtFQUVBUSxJQUFJLENBQUM7SUFBRUMsSUFBSTtJQUFFeEIsY0FBYztJQUFFeUIsY0FBYztJQUFFckIsTUFBTTtJQUFFUztFQUFRLENBQUMsRUFBRTtJQUM5RCxJQUFJLENBQUNXLElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUN4QixjQUFjLEdBQUdBLGNBQWM7SUFDcEMsSUFBSSxDQUFDQyxjQUFjLEdBQUdpQixRQUFRLENBQUNRLGFBQWEsQ0FBQyxJQUFJLENBQUMxQixjQUFjLENBQUM7SUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQ0MsY0FBYyxFQUFFO01BQ3hCLElBQUksQ0FBQ0MsT0FBTyxHQUFHLEtBQUs7TUFDcEI7TUFDQXlCLE9BQU8sQ0FBQ0MsSUFBSSxDQUFFLEdBQUVKLElBQUssZ0NBQStCLElBQUksQ0FBQ3hCLGNBQWUsRUFBQyxDQUFDO01BQzFFO0lBQ0Y7SUFDQSxJQUFJLElBQUksQ0FBQ0UsT0FBTyxFQUFFO01BQ2hCO01BQ0F5QixPQUFPLENBQUNDLElBQUksQ0FBRSxHQUFFSixJQUFLLG9EQUFtRCxDQUFDO01BQ3pFO0lBQ0Y7SUFFQSxJQUFJLENBQUN6QixPQUFPLEdBQUcwQixjQUFjO0lBQzdCLElBQUksQ0FBQ3JCLE1BQU0sR0FBR0EsTUFBTTtJQUNwQixJQUFJLENBQUNTLE9BQU8sR0FBR0EsT0FBTzs7SUFFdEI7SUFDQTs7SUFFQTtJQUNBLElBQUksQ0FBQ1YsVUFBVSxHQUFHZSxRQUFRLENBQUNRLGFBQWEsQ0FBQyxJQUFJLENBQUMzQixPQUFPLENBQUM7SUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQ0ksVUFBVSxFQUFFO01BQ3BCLE1BQU0sSUFBSTBCLEtBQUssQ0FBRSxHQUFFTCxJQUFLLHFDQUFvQyxJQUFJLENBQUN6QixPQUFRLEVBQUMsQ0FBQztJQUM3RTtJQUNBO0lBQ0EsSUFBSSxDQUFDSSxVQUFVLENBQUNNLE9BQU8sQ0FBQ3FCLEVBQUUsR0FBRyxJQUFJO0lBQ2pDLElBQUksQ0FBQ2IsWUFBWSxFQUFFO0lBRW5CLElBQUksQ0FBQ2YsT0FBTyxHQUFHLElBQUk7RUFDckI7QUFDRjtBQUVBNkIsTUFBTSxDQUFDQyxPQUFPLEdBQUcsTUFBTSxJQUFJbkMsaUJBQWlCLEVBQUUifQ==\n//# sourceURL=webpack-internal:///./src/js/nav-toggle/nav-toggle-dropdown.js\n");

/***/ })

}]);