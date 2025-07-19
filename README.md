# Hosting
Concise guide (mainly for my sake) based on the GitHub pages ("Test site locally with Jekyll")[https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll] page:

(Install Ruby)[https://www.ruby-lang.org/en/documentation/installation/]: `sudo pacman -S ruby base-devel ruby-erb`

Add Ruby to PATH (version number 3.4.0 might change): `export PATH="$HOME/.local/share/gem/ruby/3.4.0/bin:$PATH"`

Reload shell: `source ~/.bashrc`

Install dependencies: `bundle install`

Run site locally: `bundle exec jekyll serve`

(Install SASS)[https://sass-lang.com/install/]: `sudo pacman -S dart-sass`

Compile changes to SASS: `sass assets/stylesheets/index.sass assets/stylesheets/index.css`

# Credits
Inspiration for this website (and the usage of Jekyll/Liquid templating as a whole): [espi.me](https://espi.me)

Webring HTML/CSS: [espi.me Source Code](https://github.com/espimarisa/espi.me)

# Todo
Implement mobile CSS for device widths less than 740px

Implement light mode + toggle between light/dark mode

Replace grid layout on Rhythm Games page with "deconstructed pancake" flexbox layout (#2: https://1linelayouts.glitch.me/)