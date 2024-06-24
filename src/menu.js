import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  IconButton,
  CardMedia,
  CardActionArea,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import { getMenu } from "./menuApi";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
  },
  signOutButton: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  chatIcon: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  card: {
    height: "100%",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows[10],
    },
  },
  cardMedia: {
    height: 200,
    borderRadius: theme.shape.borderRadius,
  },
  addButton: {
    marginTop: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#424242",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f0ebe1",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#3e2723",
    },
    h2: {
      fontSize: "2rem",
      color: "#5d4037",
      fontWeight: "500",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

const Menu = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu();
        setMenuItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenu();
  }, []);

  const groupedMenu = menuItems.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleSignOut = () => {
    navigate("/");
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.signOutButton}
          startIcon={<ExitToAppIcon />}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
        <IconButton
          color="primary"
          className={classes.chatIcon}
          onClick={toggleChat}
        >
          <ChatIcon />
        </IconButton>
        {showChat && (
          <iframe
            allow="microphone;"
            width="350"
            height="430"
            src="https://console.dialogflow.com/api-client/demo/embedded/6279c45f-5b6e-4260-9164-461861d2e960"
            style={{
              position: "fixed",
              bottom: "70px",
              right: "20px",
              border: "none",
              zIndex: 1000,
            }}
          ></iframe>
        )}

        <Typography variant="h1" align="center">
          Restaurant Menu
        </Typography>
        {Object.keys(groupedMenu).map((category) => (
          <div key={category} style={{ marginBottom: "20px" }}>
            <Typography
              variant="h2"
              style={{ textDecoration: "underline", marginBottom: "20px" }}
            >
              {category.toUpperCase()}
            </Typography>
            <Grid container spacing={3}>
              {groupedMenu[category].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.cardMedia}
                        image={item.image}
                        title={item.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {item.description}
                        </Typography>
                        <Typography variant="body1">
                          Price: ${item.price}
                        </Typography>
                        {/* <Button
                          variant="contained"
                          color="primary"
                          className={classes.addButton}
                        >
                          Add
                        </Button> */}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    </ThemeProvider>
  );
};

export default Menu;
