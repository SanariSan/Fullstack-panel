## Theming

For any element you wish to dynamically change styles with theme switch:

1. Subscribe to theme change
```
const theme = useAppSelector(themeSelector);
```
2. Put styles into scss file near
```
.light { @include lightTheme; }
.dark { @include darkTheme; color: $color-alt; }
.anotherTheme {...}
```
3. Import styles as named space
```
import styles from './customize.module.scss';
```
4. Add class name in a way to pick whatever theme is currently selected
```
<el className={styles[theme]} .../>
```