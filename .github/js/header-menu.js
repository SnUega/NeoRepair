const burger = document.querySelector('.burger');
    const menuContainer = document.querySelector('.menu-container');
    const menuLine = document.querySelector('.menu-line');
    const body = document.body;
    let scrollPosition = 0;

    burger.addEventListener('click', () => {
      const isActive = menuContainer.classList.contains('active');

      if (!isActive) {
        scrollPosition = window.scrollY || window.pageYOffset;
        body.style.overflow = 'hidden';
        body.classList.add('menu-open');

        menuContainer.classList.add('active');

        setTimeout(() => {
          menuContainer.classList.add('line-animate');
          }, 50);

        setTimeout(() => {
          menuContainer.classList.add('show-content');
        }, 600);

        burger.classList.add('active');
      } else {
        menuContainer.classList.remove('show-content');
        menuContainer.classList.add('hide-content');

        menuLine.style.animation = 'shrinkLine 0.6s forwards';

        setTimeout(() => {
          menuContainer.classList.remove('active', 'line-animate', 'hide-content');
          menuLine.style.animation = '';
          body.style.overflow = '';
          body.classList.remove('menu-open');
        }, 600);

        burger.classList.remove('active');
      }
    });