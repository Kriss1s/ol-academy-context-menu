import { useEffect, useRef, useState } from 'react';

const randomDarkColor = () => {
  let color = '#';
  for (let i = 0; i < 3; i++)
    color += (
      '0' + Math.floor((Math.random() * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  return color;
};

export default function Container({ parent }) {
  const color = randomDarkColor();
  const ref = useRef();
  const contextMenuRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [posXY, setPosXY] = useState({ x: 0, y: 0 });

  useEffect(() => {
    ref.current.addEventListener('contextmenu', e => {
      e.preventDefault();
      setIsVisible(true);
      setPosXY({ x: e.pageX, y: e.pageY });
    });
  }, []);

  useEffect(() => {
    const handleHideMenu = e => {
      e.preventDefault();
      if (
        !ref.current?.contains(e.target) &&
        !contextMenuRef.current?.contains(e.target)
      ) {
        setIsVisible(false);
      }
    };
    const handleclick = e => {
      if (!contextMenuRef.current?.contains(e.target)) {
        setIsVisible(false);
      }
    };
    window.addEventListener('contextmenu', handleHideMenu);
    window.addEventListener('click', handleclick);

    return () => {
      window.removeEventListener('contextmenu', handleHideMenu);
      window.removeEventListener('click', handleclick);
    };
  }, [ref]);

  return (
    <>
      <li ref={ref} style={{ backgroundColor: `${color}` }}>
        {parent}
      </li>
      {isVisible && (
        <div
          ref={contextMenuRef}
          className='context-menu'
          style={{
            position: 'absolute',
            top: `${posXY.y}px`,
            left: `${posXY.x}px`,
            color: `${color}`,
          }}
        >
          {parent}

          <button
            onClick={() => {
              console.log('edit');
              setIsVisible(false);
            }}
            className='btn'
            style={{ border: `1px solid ${color}` }}
          >
            edit
          </button>
          <button
            onClick={() => {
              console.log('remove');
              setIsVisible(false);
            }}
            className='btn'
            style={{ backgroundColor: `${color}` }}
          >
            remove
          </button>
        </div>
      )}
    </>
  );
}
