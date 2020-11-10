/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-09
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.settings.fullHeight,
    },
  })
);
