# 3pp

A simple example of perspective projection of 3d models onto 
a 2d plane (onto the screen) for educational purposes.

Derived from this formula:

```md
Given a 3d point (x, y, z), we can project it onto a 2d plane (x', y') by:

x' = xf / z
y' = yf / z

where: f is the distance between the image plane and the center of projection.
```

## Features

- Scroll to zoom in/out
- Drag to rotate

## Run

You can install `serve` and run the project locally

```bash
npm install -g serve
```

or visit [here](https://nibtr.github.io/3pp)

## References

Mostly referenced this [video](https://www.youtube.com/watch?v=qjWkNZ0SXfo)
by Tsoding, with additional read:

- https://www.cse.unr.edu/~bebis/CS791E/Notes/PerspectiveProjection.pdf
- https://en.wikipedia.org/wiki/Rotation_matrix
