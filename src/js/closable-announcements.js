// eslint-disable-next-line func-names
(function (Drupal) {
  Drupal.behaviors.closable_announcements = {
    attach: function attach() {
      const ANNOUCEMENT = 'js-announcement';
      const ANNOUCEMENT_HIDE = 'js-announcement--hide';
      const DISABLED = 'js-announcement__close--disabled';
      const KEYNAME = 'hidden-helfi-announcements';

      function addToAnnouncementStorage(announcement) {
        const { uuid } = announcement.dataset;
        if (uuid) {
          const item = window.localStorage.getItem(KEYNAME);
          let itemArray = [];
          if (item) {
            try {
              itemArray = JSON.parse(item);
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error(error);
            }
          }
          itemArray.push(uuid);

          // console.log('Hiding uuid', uuid);
          window.localStorage.setItem(KEYNAME, JSON.stringify(itemArray));
        }
      }

      function closeAnnouncement(announcement) {
        addToAnnouncementStorage(announcement);
        // Set fixed height to allow CSS animation
        announcement.style = `--js-announcement-height: ${announcement.offsetHeight}px`;
        window.setTimeout(() => {
          announcement.classList.add(ANNOUCEMENT_HIDE);
          // Moving focus to correct place after closing the announcement.
          // NOTICE: This is very dependent on the html-structure of the header
          // and its components.
          // If previous sibling for the closed announcement is another
          // announcement we move the focus there.
          if (
            announcement.previousElementSibling &&
            announcement.previousElementSibling.matches('.announcement:not(.js-announcement--hide)')
          ) {
            const focusableAnnouncementElements = announcement.previousElementSibling.querySelectorAll('.announcement__close, .announcement__link a');
            focusableAnnouncementElements[focusableAnnouncementElements.length - 1].focus();
          } else {
            // If previous sibling is not announcement we need to figure out
            // if we are viewing the page with mobile or desktop navigation. We
            // check if the header-bottom menu is visible to determine this.
            const desktopMenu = document.querySelectorAll('.header-bottom .desktop-menu > .menu');
            for (let i = 0, max = desktopMenu.length; i < max; i++) {
              const desktopMenuHidden = window.getComputedStyle(desktopMenu[i]).display === 'none';
              // Depending on the visible menu we move the focus straight to
              // nav-toggle buttons or the menu links if no breadcrumb is set.
              if (desktopMenuHidden === true) {
                const focusableElements = document.querySelectorAll('.nav-toggle__button, .breadcrumb a:last-of-type');
                focusableElements[focusableElements.length - 1].focus();
              } else {
                const focusableElements = document.querySelectorAll('.nav-toggle__button, .header-bottom .menu--level-0 > .menu__item:last-child > .menu__link-wrapper :where(a, button), .breadcrumb a:last-of-type');
                focusableElements[focusableElements.length - 1].focus();
              }
            }
          }
        }, 1); // Delay setting class a bit to allow css accept fixed height before animating
      }

      function triggerAnnouncementClose(e) {
        const announcement = e.target.closest(`.${ANNOUCEMENT}`);
        closeAnnouncement(announcement);
      }

      function enableAnnouncementClosing() {
        const disabledAnnouncements = document.querySelectorAll(`.${DISABLED}`);
        for (let i = 0; i < disabledAnnouncements.length; i++) {
          const announcement = disabledAnnouncements[i];
          announcement.addEventListener('click', triggerAnnouncementClose);
          announcement.classList.remove(DISABLED);
        }
      }

      // This can be called from addressbar using `javascript:unhideAnnouncements();`
      window.unhideAnnouncements = function unhideAnnouncements() {
        window.localStorage.removeItem(KEYNAME);
        window.location.reload();
      };

      enableAnnouncementClosing();
    },
  };
})(Drupal);
