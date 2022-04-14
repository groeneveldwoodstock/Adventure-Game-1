//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 1, 1],
})

// Speeds
const MOVE_SPEED = 120
const SLICER_SPEED = 100
const SKELETOR_SPEED = 60

// Game Logic
loadRoot('zimages/')
loadSprite('link-going-left', 'left.png')
loadSprite('link-going-right', 'right.png')
loadSprite('link-going-down', 'forward.png')
loadSprite('link-going-up', 'top.png')
loadSprite('left-wall', 'leftwall.png')
loadSprite('top-wall', 'topwall.png')
loadSprite('bottom-wall', 'bottomwall.png')
loadSprite('right-wall', 'rightwall.png')
loadSprite('bottom-left-wall', 'bottomleft.png')
loadSprite('bottom-right-wall', 'bottomright.png')
loadSprite('top-left-wall', 'topleft.png')
loadSprite('top-right-wall', 'topright.jpg')
loadSprite('top-door', 'topdoor.png')
loadSprite('fire-pot', 'planter.png')
loadSprite('left-door', 'leftdoor.png')
loadSprite('lanterns', 'candles.png')
loadSprite('slicer', 'rock.png')
loadSprite('skeletor', 'monster.png')
loadSprite('ogre', 'monster2.png')
loadSprite('kaboom', 'boom.png')
loadSprite('stairs', 'stairs.png')
loadSprite('bg', 'floor.png')
loadSprite('bg2', 'stonefloor.png')
loadSprite('bg3', 'chevronfloor.png')
loadSprite('bg4', 'bg4.png')
loadSprite('key', 'goldpot.png')
loadSprite('hole', 'hole.png')
loadSprite('plants', 'plants.png')
loadSprite('lake', 'lake.png')
loadSprite('plus', 'addthis.png')
loadSprite('rubble', 'rubble.png')
loadSprite('rocks', 'rocks.png')
loadSprite('bottle', 'bottle.png')
loadSprite('barrel', 'barrel.png')
loadSprite('bridge', 'bridge.png')
scene('game', ({ level, score, keys, lives }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const maps = [
    [//1
      'ycc)cc^cccw',
      'a !       b',
      'a *    *  b',
      'a    (    b',
      'a   hn    b',
      'a    (    b',
      'a   *  *  b',
      'a         b',
      'a   h#h   b',
      'xdd)dd)dddz',
    ],
    [//2
      'yccccccccw',
      'a    #   b',
      ')  rrrr  )',
      'a   h#   b',
      'a  }     b',
      'a    $ * b',
      ')  }     )',
      'a #  #   b',
      'xddddddddz',
    ],
    [//3
      'yccccccccw',
      'a     l&lb',
      ') && &&& )',
      'a &      b',
      'a     &&&b',
      'a &   $&lb',
      ') & } && )',
      'al&     !b',
      'xddddddddz',
    ],
    [//4
      'ycccccc^cw',
      'a    (   b',
      ')  * ( } )',
      'a   }(   b',
      'a    & h b',
      'a *      b',
      ')   & *  )',
      'a!       b',
      'xddddddddz',
    ],
    [//5
      'ycccccc^cw',
      'a   &(   b',
      ')    (   )',
      'a } &&& !b',
      'a   &    b',
      'a      * b',
      'a h    } )',
      'a &#&    b',
      'xddddddddz',
    ],
    [//6
      'yccccccccw',
      'a      h b',
      ')  *     )',
      'a    ( } b',
      'a    &   b',
      'a    h   b',
      'ah !   } )',
      '%       +b',
      'xddddddddz',
    ],
    [//7
      'yccccccccw',
      '%    h   b',
      'a *  ( } )',
      'a    (   b',
      'a    &   b',
      'a        b',
      'a&&& } &&b',
      'a        b',
      'xddddddddz',
    ],
    [//8
      'ycccccc^cw',
      'a   hh h b',
      ')    h h )',
      'a  * (   b',
      'a    &   b',
      'a   *    b',
      ')  h  *  )',
      'a   h    b',
      'xddddddddz',
    ],
    [//9
      'yccc^ccccw',
      'a #  (   b',
      'a    h m )',
      'a&&&&h   b',
      'a    &   b',
      'a    !   b',
      'a    & & )',
      'a  #     b',
      'xddddddddz',
    ],
    [
      'yccccccccw',
      'a   hh   b',
      ')   }(   )',
      'a    (   b',
      'a    &   b',
      'a   }    b',
      ')hh    * )',
      'a    h   b',
      'xdddddd^dz',
    ],
    [
      'yccccccccw',
      'a}   h   b',
      'a &&&&&& b',
      'a &h   & b',
      'a &!&& & b',
      'a &$& h& b',
      'a &&& && b',
      'a   &  !hb',
      'xddddddddz',
    ],
    [
      'yccccccccw',
      'a        b',
      'a &&&&   b',
      'a  r(l  hb',
      'a    h   b',
      'a   l  } b',
      ')  r    rb',
      'a m  l o b',
      'xddddddddz',
    ],
    [
      'ycccccc^cw',
      'a    hh  b',
      ')  * &  &b',
      'a    h&  b',
      'a  h &   b',
      'a& & & & b',
      ')& & h &&)',
      'a& # &  hb',
      'a& #    $b',
      'xddddddddz',
    ],
  ]

  const levelCfg = {
    width: 48,
    height: 48,
    a: [sprite('left-wall'), solid(), 'wall', 'object'],
    b: [sprite('right-wall'), solid(), 'wall', 'object'],
    c: [sprite('top-wall'), solid(), 'wall', 'object'],
    d: [sprite('bottom-wall'), solid(), 'wall', 'object'],
    w: [sprite('top-right-wall'), solid(), 'wall', 'object'],
    x: [sprite('bottom-left-wall'), solid(), 'wall', 'object'],
    y: [sprite('top-left-wall'), solid(), 'wall', 'object'],
    z: [sprite('bottom-right-wall'), solid(), 'wall', 'object'],
    '%': [sprite('left-door'), 'next-level', 'object'],
    ':': [sprite('rubble'), 'rubble'],
    '^': [sprite('top-door'), 'next-level', 'object'],
    $: [sprite('stairs'), 'next-level', 'object'],
    '*': [sprite('slicer'), 'slicer', { dir: -1 }, 'dangerous', 'object'],
    '}': [sprite('skeletor'), 'dangerous', 'skeletor', 'object', { dir: -1, timer: 0 }],
    'm': [sprite('ogre'), 'dangerous', 'ogre', 'object', { dir: -1, timer: 0 }],
    ')': [sprite('lanterns'), solid(), 'object'],
    'h': [sprite('barrel'), solid(),'barrel', 'object'],
    '(': [sprite('fire-pot'), solid(), 'object'],
    '&': [sprite('plants'), solid(), 'object'],
    '#': [sprite('hole'), 'garden-level'],
    '!': [sprite('key'), 'item', 'object'],
    '+': [sprite('plus'), 'bonus'],
    'l': [sprite('lake'), 'garden-level', 'object'],
    'o': [sprite('bottle'),'potion'],
    'r': [sprite('rocks'),'rubble', 'object'],
    'n': [sprite('bridge'),'rubble', 'object']
  }
  addLevel(maps[level], levelCfg)
  if(level==0){
    add([sprite('bg'), layer('bg')])
  }
  else if (level==maps.length-1){
    add([sprite('bg4'), layer('bg')])
  }
  else if (level%2==0){
    add([sprite('bg3'), layer('bg')])
  }
  else{
    add([sprite('bg2'), layer('bg')])
  }
  const livesLabel = add([
    text('Lives ' + lives),
    pos(530, 25),
    layer('ui'),
    {
      value: lives,
    },
    scale(2),
    color(0.3, 0.9, 0.5),
  ])
  const keyLabel = add([
    text('Gold ' + keys),
    pos(530, 100),
    layer('ui'),
    {
      value: keys,
    },
    scale(2),
  ])
  const scoreLabel = add([
    text('Score '+ score),
    pos(530, 75),
    layer('ui'),
    {
      value: score,
    },
    scale(2),
  ])
  const instructionsLabel = add([
    text("Use arrows to move.\nUse space bar to\nblow things up."),
    pos(530, 125),
    layer('ui'),
    scale(2),
    color(0.7, 0.7, 0.7),
  ])
  const announceLabel = add([
    text(announcement()),
    pos(530, 200),
    layer('ui'),
    scale(2),
    color(0.9, 0.3, 0.0),
  ])

  add([text('Level ' + parseInt(level + 1)), pos(530, 50), scale(2)])

  const player = add([
    sprite('link-going-right'),
    pos(5, 190),
    {
      // right by default
      dir: vec2(1, 0),
    },
  ])

  player.action(() => {
    player.resolve()
  })

  player.collides('next-level', () => {
    go('game', {
      level: findLevel(),
      score: scoreLabel.value,
      keys: keyLabel.value,
      lives: livesLabel.value,
    })
  })

  player.overlaps('garden-level', () => {
    go('game', {
      level: maps.length-1,
      score: scoreLabel.value,
      keys: keyLabel.value,
      lives: livesLabel.value,
    })
  })

  keyDown('left', () => {
    player.changeSprite('link-going-left')
    player.move(-MOVE_SPEED, 0)
    player.dir = vec2(-1, 0)
  })

  keyDown('right', () => {
    player.changeSprite('link-going-right')
    player.move(MOVE_SPEED, 0)
    player.dir = vec2(1, 0)
  })

  keyDown('up', () => {
    player.changeSprite('link-going-up')
    player.move(0, -MOVE_SPEED)
    player.dir = vec2(0, -1)
  })

  keyDown('down', () => {
    player.changeSprite('link-going-down')
    player.move(0, MOVE_SPEED)
    player.dir = vec2(0, 1)
  })

  function spawnKaboom(p) {
    const obj = add([sprite('kaboom'), pos(p), 'kaboom'])
    wait(1, () => {
      destroy(obj)
    })
  }
  function spawnRubble(p) {
    wait(1, () => {
      const obj = add([sprite('rubble'), pos(p), 'rubble'])
    })
  }
  function findLevel() {
    if (level < maps.length-1){
      return level + 1;
    }
    else{
      return 0;
    }
  }
  function announcement(){
    if (level == maps.length-1)
    {
      return "YOUR IN THE DUNGEON!\n\nYou must have died\nby getting too close\nto a monster,\nfallen in a hole,\nor gotten wet.\n\nThe stairs go back to level 1.\n\nYou don't lose a life\nunless you get too close\nto a monster.";  
    }
    else if(level == 0)
    {
      return "Don't get near\nthe stone monsters!";
    }
    else if(level == 1)
  {
      return "Avoid these monsters\nor try and blow them up!";
    }
    else if(level == 2)
    {
      return "Collect the gold!\nWhen you can.";
    }
    else if(level == 4)
    {
      return "You can blow up\nthe barrels.";
    }
    else if(level == 5)
    {
      return "The plus means\nan extra life.";
    }
    else if(level == 6)
    {
      return "Find the potion\nto win the game!";
    }
    else if(level == 8)
    {
      return "You have to be very\nsneaky to get past him.";
    }
    else if(level == 9)
    {
      return "Find the potion\nto win the game!\n\nYou are getting close!";
    }
    else 
    {
      return "Time for Adventure!\n\nTHE SEARCH FOR THE POTION";
    }
  }
  keyPress('space', () => {
    spawnKaboom(player.pos.add(player.dir.scale(48)))
  })
  

  player.collides('door', (d) => {
    destroy(d)
  })
  
  collides('kaboom', 'skeletor', (k,s) => {
    camShake(4)
    wait(1, () => {
      destroy(k)
    })
    destroy(s)
    scoreLabel.value++
    scoreLabel.text = 'score ' + scoreLabel.value
  })
  collides('kaboom', 'barrel', (k,b) => {
    wait(1, () => {
      destroy(k)
    })
    destroy(b)  
      spawnRubble(player.pos.add(player.dir.scale(48)))
  })

  action('slicer', (s) => {
    s.move(s.dir * SLICER_SPEED, 0)
  })

  collides('slicer', 'object', (s) => {
    s.dir = -s.dir
  })
  collides('skeletor', 'object', (s) => {
    s.dir = -s.dir
  })
  

  action('skeletor', (s) => {
    s.move(0, s.dir * SKELETOR_SPEED)
    s.timer -= dt()
    if (s.timer <= 0) {
      s.dir = -s.dir
      s.timer = rand(5)
    }
  })

  collides('dangerous', 'wall', (d,w) => {
    d.dir *=-1
  })

  player.overlaps('dangerous', () => {
    livesLabel.value--
    livesLabel.text = 'Lives ' + livesLabel.value
    if (livesLabel.value < 0) {go('lose', { score: scoreLabel.value })}
    else{
      camShake(4)
      go('game', {
      level: maps.length-1,
      score: scoreLabel.value,
      keys: keyLabel.value,
      lives: livesLabel.value,
    })}
  })
  player.collides('item', (i) => {
    get('item')
    destroy(i)
    keyLabel.value++
    scoreLabel.value++
    scoreLabel.value++
    keyLabel.text = 'Gold ' + keyLabel.value
    scoreLabel.text = 'Score ' + scoreLabel.value
  })
  player.overlaps('potion', (i) => {
    go('win', { score: scoreLabel.value })
    destroy(i)
  })
  player.collides('bonus', (b) => {
    get('bonus')
    destroy(b)
    livesLabel.value++
    livesLabel.text = 'Lives ' + livesLabel.value
    announceLabel.text = 'You earned another life!'
  })
  
})

scene('lose', ({ score, keys }) => {
  layers(['bg', 'obj', 'ui'], 'obj')
  add([text('Game Over\nScore: ' + score, 28), origin('center'), pos(width() / 2, 100)])
  keyPress('n', () => {
    window.location.reload();
  })
  add([
		rect(160, 40),origin('center'),
		pos(width()/2, 180),
		"button",
		{
			clickAction: () => go('game', { level: 0, score: 0 , keys:0, lives:3}),
		},
	]);
  add([
		text("Play Again"),origin('center'),
		pos(width()/2, 180),
    scale(2),
		color(0, 255, 0)
	]);
  action("button", b => {

		if (b.isHovered()) {
			b.use(color(0.7, 0.7, 0.7));
		} else {
			b.use(color(255, 0, 0));
		}

		if (b.isClicked()) {
			b.clickAction();
		}

	});
  
})
scene('win', ({ score, keys }) => {
  layers(['bg', 'obj', 'ui'], 'obj')
  add([text('Great Work Adventurer!\nScore: ' + score, 28), origin('center'), pos(width() / 2, 100)])
  keyPress('n', () => {
    window.location.reload();
  })
  add([
		rect(160, 40),origin('center'),
		pos(width()/2, 180),
		"button",
		{
			clickAction: () => go('game', { level: 0, score: 0 , keys:0, lives:3}),
		},
	]);
  add([
		text("Play Again"),origin('center'),
		pos(width()/2, 180),
    scale(2),
		color(0, 255, 0)
	]);
  action("button", b => {

		if (b.isHovered()) {
			b.use(color(0.7, 0.7, 0.7));
		} else {
			b.use(color(255, 0, 0));
		}

		if (b.isClicked()) {
			b.clickAction();
		}

	});
  
})
scene("menu", () => {

	add([
		text("Adventurer\nBy Mr. Groeneveld\nPope HS\nComputer Science"), origin('center'),
		pos(width()/2, 60),
		scale(3),
	]);

	add([
		rect(160, 40),origin('center'),
		pos(width()/2, 180),
		"button",
		{
			clickAction: () => go('game', { level: 0, score: 0 , keys:0, lives:3}),
		},
	]);

	add([
		text("Play game"),origin('center'),
		pos(width()/2, 180),
    scale(2),
		color(0, 255, 0)
	]);

	add([
		rect(255, 40),origin('center'),
		pos(width()/2, 240),
		"button",
		{
			clickAction: () => window.open('https://kaboomjs.com/', '_blank'),
		},
	]);

	add([
		text("Learn Kaboom.js"),origin('center'),
		pos(width()/2, 240),
    scale(2),
		color(0, 0, 255)
	]);
  
  	add([
		rect(430, 40),origin('center'),
		pos(width()/2, 300),
		"button",
		{
			clickAction: () => window.open('https://replit.com/@RichardGroeneve/Zelda-Kaboom#game.js', '_blank'),
		},
	]);

	add([
		text("Starter Code For This Game"),origin('center'),
		pos(width()/2, 300),
    scale(2),
		color(255, 255, 0)
	]);

  add([
		text("Currently In Development!\nGame will update\from time to time."),origin('center'),
		pos(width()/2, 400),
		scale(2),
	]);

	action("button", b => {

		if (b.isHovered()) {
			b.use(color(0.7, 0.7, 0.7));
		} else {
			b.use(color(255, 0, 0));
		}

		if (b.isClicked()) {
			b.clickAction();
		}

	});

});

start("menu")