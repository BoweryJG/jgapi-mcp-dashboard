                            <Typography variant="body2" color="textSecondary">
                              {server.reviews} reviews
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={server.category} 
                          size="small" 
                          variant="outlined"
                          color="primary"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {server.downloads.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <Star sx={{ color: 'warning.main', fontSize: 16, mr: 0.5 }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {server.rating}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <ArrowUpward sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                          <Typography 
                            variant="subtitle2" 
                            sx={{ fontWeight: 600, color: 'success.main' }}
                          >
                            {server.growth}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={server.status} 
                          size="small"
                          color={
                            server.status === 'trending' ? 'primary' :
                            server.status === 'hot' ? 'error' :
                            server.status === 'new' ? 'success' : 'default'
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" color="textSecondary" textAlign="center" sx={{ py: 4 }}>
              Fastest Growing Servers - Content will be loaded dynamically
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" color="textSecondary" textAlign="center" sx={{ py: 4 }}>
              Most Downloaded Servers - Content will be loaded dynamically
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Typography variant="h6" color="textSecondary" textAlign="center" sx={{ py: 4 }}>
              Highest Rated Servers - Content will be loaded dynamically
            </Typography>
          </TabPanel>
        </CardContent>
      </Card>

      {/* Live Updates Section */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          🔴 Live Updates
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {mockMetrics.newThisWeek}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                New servers this week
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                +{mockMetrics.growthRate}%
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Overall growth rate
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                {mockMetrics.activeUsers.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Active users online
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
