!function(){function e(e,t){return new Promise((function(n,o){var i=Math.random()>.3;setTimeout((function(){i?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(function(t){t.preventDefault();for(var n=new FormData(t.target),o=Number(n.get("delay")),i=Number(n.get("step")),a=Number(n.get("amount")),c=1;c<=a;c+=1)e(c,o).then((function(e){var t=e.position,n=e.delay;console.log("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;console.log("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))})),o+=i}))}();
//# sourceMappingURL=03-promises.34b2ee8d.js.map
