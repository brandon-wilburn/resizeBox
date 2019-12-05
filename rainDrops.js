var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var showMe = document.getElementById("doThisContainer");

function makeResizableDiv(div) {
    const element = document.querySelector(div);
    // console.log(element);
    const resizers = document.querySelectorAll(div + ' .resizer')
    const minimum_size = 100;
    let original_width = 0;
    let original_height = 0;
    let original_x = w/2;
    let original_y = h/2;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0;i < resizers.length; i++) {
      const currentResizer = resizers[i];
      currentResizer.addEventListener('mousedown', function(e) {
        e.preventDefault()
        original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
        original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
        $("#doThisContainer").hide();
        setTimeout(showThePeople, 10000);
      })
      
      function resize(e) {
        //   showMe.setAttribute("display", "none");
        if (currentResizer.classList.contains('bottom-right')) {
          const width = original_width + (e.pageX - original_mouse_x);
          const height = original_height + (e.pageY - original_mouse_y);
          if (width > minimum_size) {
            element.style.width = width + 'px';
            createNewBound(element.getBoundingClientRect().left, element.getBoundingClientRect().top, width, height);
            // console.log(element.getBoundingClientRect().left);
          }
          if (height > minimum_size) {
            element.style.height = height + 'px';
            createNewBound(element.getBoundingClientRect().left, element.getBoundingClientRect().top, width, height);
            // console.log(element);
          }
        }
        else if (currentResizer.classList.contains('bottom-left')) {
          const height = original_height + (e.pageY - original_mouse_y)
          const width = original_width - (e.pageX - original_mouse_x)
          if (height > minimum_size) {
            element.style.height = height + 'px';
            createNewBound(element.getBoundingClientRect().left, element.getBoundingClientRect().top, width, height);
            // console.log(element.getBoundingClientRect().left);
            // console.log(element.getBoundingClientRect().top);
            // console.log("new height: "+element.style.height);
          }
          if (width > minimum_size) {
            element.style.width = width + 'px';
            element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
            createNewBound(element.getBoundingClientRect().left, element.getBoundingClientRect().top, width, height);
            // console.log(element.getBoundingClientRect().left);
            // console.log(element.getBoundingClientRect().top);
            // console.log("new width: "+element.style.width);
          }
        }
        else if (currentResizer.classList.contains('top-right')) {
          const width = original_width + (e.pageX - original_mouse_x)
          const height = original_height - (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            element.style.width = width + 'px';
            createNewBound(element.getBoundingClientRect().left, element.getBoundingClientRect().top, width, height);
            // console.log(element.getBoundingClientRect().left);
            // console.log(element.getBoundingClientRect().top);
            // console.log("new width: "+element.style.width);
          }
          if (height > minimum_size) {
            element.style.height = height + 'px';
            // console.log("new height: "+element.style.height);
            element.style.top = original_y + (e.pageY - original_mouse_y) + 'px';
            createNewBound(element.getBoundingClientRect().left, element.getBoundingClientRect().top, width, height);
            // console.log(element.getBoundingClientRect().left);
            // console.log(element.getBoundingClientRect().top);
          }
        }
        else {
          const width = original_width - (e.pageX - original_mouse_x)
          const height = original_height - (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            element.style.width = width + 'px';
            // console.log("new width: "+element.style.width);
            element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
            createNewBound(element.getBoundingClientRect().left, element.getBoundingClientRect().top, width, height);
            // console.log(element.getBoundingClientRect().left);
            // console.log(element.getBoundingClientRect().top);
          }
          if (height > minimum_size) {
            element.style.height = height + 'px';
            // console.log("new height: "+element.style.height);
            element.style.top = original_y + (e.pageY - original_mouse_y) + 'px';
            createNewBound(element.getBoundingClientRect().left, element.getBoundingClientRect().top, width, height);
            // console.log(element.getBoundingClientRect().left);
            // console.log(element.getBoundingClientRect().top);
          }
        }
      }
      
      function stopResize() {
        window.removeEventListener('mousemove', resize)
      }
    }
  }
  
makeResizableDiv('.resizable');
function showThePeople(){
    $("#doThisContainer").show();
}

var Example = Example || {};
// console.log("rainDrops loaded");
Matter.use(
    'matter-wrap'
);

// Example.avalanche = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    
    // create renderer
    // var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    // var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var canvas = document.getElementById("canvas");
    canvas.width = w;
    canvas.height = h;
    var render = Render.create({
        element: document.body,
        canvas: canvas,
        engine: engine,
        options: {
            width: w,
            height: h,
            wireframes: false
            // showAngleIndicator: true
        }
    });

    render.options.background = 'transparent';

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var stack = Composites.stack(0, 5, 20, 20, 0, 0, function(x, y) {
        return Bodies.circle(x, y, Common.random(10, 40), { friction: 0.8, restitution: 1, density: 0.00001 }, 1);
    });
    World.add(world, stack);

    // console.log("h: "+h);
    // console.log("w: "+w);
    var rect = function(x, y, wid, hei) {
        var xPercent = x / w;
        // console.log("X Percent: "+xPercent);
        var yPercent = y / h;
        // console.log("Y Percent: "+yPercent);
        return Bodies.rectangle(x, y, wid, hei, { isStatic: true, render: {fillStyle: "transparent"}});
    }

    function createNewBound(x, y, width, height) {
        // const width2 = original_width + (e.pageX - original_mouse_x);
        // const height2 = original_height + (e.pageY - original_mouse_y);
        if (width <= 100 ) {
            World.remove(world, world.bodies[0]);
            var shiftedX = x + width/2;
            var shiftedY = y + height/2;
            World.add(world, rect(shiftedX, shiftedY, 100, height));
            // console.log("X: "+x);
            // console.log("Y: "+y);
            // console.log("Height: "+height);
            // console.log("Width: 100");
        }
        else if (height <= 100 ) {
            World.remove(world, world.bodies[0]);
            var shiftedX = x + width/2;
            var shiftedY = y + height/2;
            World.add(world, rect(shiftedX, shiftedY, width, 100));
            // console.log("X: "+x);
            // console.log("Y: "+y);
            // console.log("Height: 100");
            // console.log("Width: "+width);
        } else {
            World.remove(world, world.bodies[0]);
            var shiftedX = x + width/2;
            var shiftedY = y + height/2;
            World.add(world, rect(shiftedX, shiftedY, width, height));
            // console.log("X: "+x);
            // console.log("Y: "+y);
            // console.log("Height: "+height);
            // console.log("Width: "+width);
        }
    }

    World.add(world, [
        Bodies.rectangle(w/2, h/2, 100, 100, { isStatic: true, render: {fillStyle: "transparent"} }),
        // Bodies.rectangle(500, 350, 700, 20, { isStatic: true, angle: -Math.PI * 0.06 }),
        // Bodies.rectangle(340, 580, 700, 20, { isStatic: true, angle: Math.PI * 0.04 })
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    // render.mouse = mouse;

    // fit the render viewport to the scene
    // Render.lookAt(render, Composite.allBodies(world));

    // wrapping using matter-wrap plugin
    for (var i = 0; i < stack.bodies.length; i += 1) {
        stack.bodies[i].plugin.wrap = {
            min: { x: render.bounds.min.x, y: render.bounds.min.y },
            max: { x: render.bounds.max.x, y: render.bounds.max.y }
        };
        // console.log(render.bounds.min.x);
        // console.log(render.bounds.min.y);
        // console.log(render.bounds.max.x);
        // console.log(render.bounds.max.y);
    }

    // context for MatterTools.Demo
    // return {
    //     engine: engine,
    //     runner: runner,
    //     render: render,
    //     canvas: render.canvas,
    //     stop: function() {
    //         Matter.Render.stop(render);
    //         Matter.Runner.stop(runner);
    //     }
    // };
// };
