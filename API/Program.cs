using API.Configurations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// add database config
builder.Services.AddDatabaseConfig(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddCors(opt => opt.AddDefaultPolicy(p =>
p.WithOrigins("http://localhost:4200", "https://localhost:4200")
.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors();
app.Run();
