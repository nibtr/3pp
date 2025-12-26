# 3pp

Just a very simple example of perspective projection of a 3d model into
a 2d plane (onto the screen), based on this simple formula:

```md
Given a 3d point (x, y, z), we can project it into a 2d plane (x', y') by:

x' = xf / z
y' = yf / z

where:

- f is the distance between the image plane and the center of
projection, or the focal length.
```

## References

- https://www.cse.unr.edu/~bebis/CS791E/Notes/PerspectiveProjection.pdf
